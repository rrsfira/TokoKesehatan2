// Importing library yang diperlukan
const { nanoid } = require("nanoid"); // Untuk membuat ID unik
const { transactionService } = require("./transaction.service.js"); // Mengambil service transaksi
const { reformTransaction } = require("../utils/reform-transaction.js"); // Fungsi untuk memformat transaksi
const {
  CANCELED,
  MIDTRANS_SERVER_KEY,
  PENDING_PAYMENT,
  MIDTRANS_APP_URL,
  FRONT_END_URL,
} = require("../utils/constant.js"); // Mengambil konstanta yang digunakan dalam aplikasi
const crypto = require("crypto"); // Untuk membuat hash (untuk verifikasi signature)

// Fungsi untuk membuat transaksi baru (POST request)
const createTransaction2 = async (req, res) => {
  const { transaction_id, id_produk, id_user, jumlah, harga, alamat } =
    req.body;
  // Membuat transaction_id yang unik menggunakan nanoid
  const transaction_midtrans = `TRX-${nanoid(4)}-${nanoid(8)}`;
  const total_harga = jumlah * harga; // Menghitung total harga berdasarkan jumlah dan harga

  // Membuat authorization string untuk Midtrans
  const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}`).toString("base64");

  // Payload yang akan dikirim ke Midtrans API
  const payload = {
    transaction_details: {
      order_id: transaction_midtrans,// ID transaksi yang unik
      gross_amount: total_harga,// Total harga transaksi
    },
    credit_card: {
      secure: true,// Menggunakan secure credit card untuk transaksi
    },
    customer_details: {
      first_name: "tes",// Contoh nama depan
      last_name: "",// Contoh nama belakang
      email: "tes@gmail.com",// Contoh email
    },
    callback: {
      finish: `${FRONT_END_URL}/`, // URL callback saat transaksi selesai
      error: `${FRONT_END_URL}/`,// URL callback jika ada error
      pending: `${FRONT_END_URL}/`,// URL callback jika transaksi pending
    },
  };
  // Mengirimkan request ke API Midtrans untuk membuat transaksi
  const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${authString}`,// Header untuk otentikasi
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),// Payload yang dikirimkan dalam format JSON
  });

  const data = await response.json();// Mendapatkan response dari Midtrans

  // Menyimpan transaksi ke database dengan snap token dan redirect URL
  await transactionService.createTransaction({
    transaction_id,
    snap_token: data.token,
    snap_redirect_url: data.redirect_url,
  });

  res.json({
    status: "success",
    data: {
      id: transaction_id,
      status: PENDING_PAYMENT,
      id_produk,
      id_user,
      snap_token: data.token,
      snap_redirect_url: data.redirect_url,
    },
  });
};

const getTransactions = async (req, res) => {
  const { status } = req.query;
  const transactions = await transactionService.getTransactions({ status });

  res.json({
    status: "success",
    data: transactions.map((transaction) => reformTransaction(transaction)),
  });
};

const getTransactionById = async (req, res) => {
  const { transaction_id } = req.params;
  const transaction = await transactionService.getTransactionById({
    transaction_id,
  });

  if (!transaction) {
    return res.status(404).json({
      status: "error",
      message: "Transaction not found",
    });
  }

  res.json({
    status: "success",
    data: reformTransaction(transaction),
  });
};

const updateTransactionStatus = async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;
  const transaction = await transactionService.updateTransactionStatus({
    transaction_id,
    status,
  });

  res.json({
    status: "success",
    data: transaction,
  });
};

const updateStatusBasedOnMidtransResponse = async (transaction_id, data) => {
  const hash = crypto
    .createHash("sha512")
    .update(
      `${transaction_id}${data.status_code}${data.gross_amount}${MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (data.signature_key !== hash) {
    return {
      status: "error",
      message: "Invalid signature key",
    };
  }

  let responseData = null;
  const { transaction_status, fraud_status } = data;

  if (transaction_status === "capture" && fraud_status === "accept") {
    responseData = await transactionService.updateTransactionStatus({
      transaction_id,
      status: "PAID",
      payment_method: data.payment_type,
    });
  } else if (transaction_status === "settlement") {
    responseData = await transactionService.updateTransactionStatus({
      transaction_id,
      status: "PAID",
      payment_method: data.payment_type,
    });
  } else if (
    transaction_status === "cancel" ||
    transaction_status === "deny" ||
    transaction_status === "expire"
  ) {
    responseData = await transactionService.updateTransactionStatus({
      transaction_id,
      status: CANCELED,
    });
  } else if (transaction_status === "pending") {
    responseData = await transactionService.updateTransactionStatus({
      transaction_id,
      status: PENDING_PAYMENT,
    });
  }

  return {
    status: "success",
    data: responseData,
  };
};

const trxNotif = async (req, res) => {
  const data = req.body;
  transactionService
    .getTransactionById({ transaction_id: data.order_id })
    .then((transaction) => {
      if (transaction) {
        updateStatusBasedOnMidtransResponse(transaction.id, data).then(
          (result) => {
            console.log("result", result);
          }
        );
      }
    });

  res.status(200).json({
    status: "success",
    message: "OK",
  });
};

// Export semua function
module.exports = {
  createTransaction2,
  getTransactions,
  getTransactionById,
  updateTransactionStatus,
  trxNotif,
};
