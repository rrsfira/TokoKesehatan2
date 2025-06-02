// Import library dan tools yang dibutuhkan
const express = require("express");
const router = express.Router();

// Import controller Midtrans (pembuatan transaksi dan notifikasi)
const {
  createTransaction,       // Fungsi untuk membuat transaksi (Midtrans)
  handleNotification       // Fungsi untuk menangani notifikasi pembayaran dari Midtrans
} = require("../controllers/transactionController");

// Import fungsi transaksi lainnya (alternatif/custom backend)
const {
  createTransaction2,
  getTransactionById,
  getTransactions,
  updateTransactionStatus,
  trxNotif,
} = require("../transactions/index.js");
const catchAsync = require("../utils/catch-async.js");

router.post("/create", createTransaction);
router.post("/notify", handleNotification);

// transactions
router.post("/payment", catchAsync(createTransaction2));
router.post("/notification", catchAsync(trxNotif));
router.get("", catchAsync(getTransactions));
router.get("/:transaction_id", catchAsync(getTransactionById));
router.put("/:transaction_id", catchAsync(updateTransactionStatus));

module.exports = router;
