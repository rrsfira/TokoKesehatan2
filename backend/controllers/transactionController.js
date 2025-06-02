// Import library Midtrans dan koneksi database
const midtransClient = require("midtrans-client");
const db = require("../config/db");
require("dotenv").config();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// Membuat transaksi baru dan mendapatkan token Snap Midtrans
exports.createTransaction = async (req, res) => {
  const { user_id, total } = req.body;

  if (!user_id || !total || isNaN(total)) {
    return res.status(400).json({ message: "User ID atau Total tidak valid" });
  }

  try {
    // Simpan transaksi awal ke database dengan status 'menunggu'
    const [result] = await db.query(
      "INSERT INTO transactions (user_id, total, status) VALUES (?, ?, 'menunggu')",
      [user_id, total]
    );
    const transactionId = result.insertId;
    const order_id = `ORDER-${transactionId}`;

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: parseInt(total),
      },
      credit_card: {
        secure: true, // Menggunakan 3D Secure untuk pembayaran kartu kredit
      },
      customer_details: {
        first_name: "Customer",
        email: "customer@email.com",
      },
    };

    // Kirim request ke Midtrans Snap dan dapatkan token transaksi
    const snapResponse = await snap.createTransaction(parameter);

    // Update transaksi di database dengan token dari Midtrans dan metode pembayaran
    db.query("UPDATE transactions SET token = ?, method = ? WHERE id = ?", [
      snapResponse.token,
      "Midtrans",
      transactionId,
    ]);

    res.json({
      token: snapResponse.token,
      order_id, // ← kembalikan full ORDER-<id>
    });
  } catch (error) {
    console.error("Midtrans Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Gagal memproses transaksi Midtrans." });
  }
};

exports.handleNotification = (req, res) => {
  const notification = req.body;
  const orderId = notification.order_id;
  const status = notification.transaction_status;

  const transactionId = parseInt(orderId.split("-")[1]);
  let finalStatus = "menunggu";

  if (status === "settlement") finalStatus = "berhasil";
  else if (["deny", "cancel", "expire"].includes(status)) finalStatus = "gagal";

  db.query(
    "UPDATE transactions SET status = ? WHERE id = ?",
    [finalStatus, transactionId],
    (err) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Gagal update status");
      }
      res.status(200).send("OK");
    }
  );
};
