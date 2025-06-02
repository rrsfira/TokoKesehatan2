const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Total produk
router.get("/products", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total: results[0].total, description: "Jumlah semua produk" });
  });
});

// Total kategori
router.get("/categories", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM categories", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total: results[0].total, description: "Jumlah semua kategori" });
  });
});

// Total user
router.get("/users", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total FROM users WHERE role = 'user'",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ total: results[0].total, description: "Jumlah user" });
    }
  );
});

// Total transaksi
router.get("/transaction", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM transactions", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total: results[0].total, description: "Jumlah semua transaksi" });
  });
});

module.exports = router;
