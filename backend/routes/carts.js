const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all carts
// Mengambil semua data keranjang belanja dari tabel "carts"
router.get("/", (req, res) => {
  db.query("SELECT * FROM carts", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });// Jika ada error, kirimkan status 500
    res.json(results);// Jika berhasil, kembalikan data keranjang dalam format JSON
  });
});

// GET carts by user & status = pending
// Mengambil data keranjang belanja berdasarkan user_id dan status transaksi 'pending'
router.get("/user/:user_id", (req, res) => {
  const userId = req.params.user_id;// Mengambil user_id dari URL parameter
  const query = `
    SELECT c.*, p.name, p.image, p.price, t.status
    FROM carts c
    JOIN transactions t ON c.transaction_id = t.id
    JOIN products p ON c.product_id = p.id
    WHERE t.user_id = ? AND t.status = 'pending'
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);// Mengembalikan hasil query dalam format JSON
  });
});

// GET carts by transaction
// Mengambil data keranjang berdasarkan transaction_id
router.get("/transaction/:transaction_id", (req, res) => {
  const transactionId = req.params.transaction_id; // Mengambil transaction_id dari URL parameter
  const query = `
    SELECT c.*, p.name, p.image, p.price
    FROM carts c
    JOIN products p ON c.product_id = p.id
    WHERE c.transaction_id = ?
  `;
  db.query(query, [transactionId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST cart item
router.post("/", (req, res) => {
  const { transaction_id, user_id, product_id, amount, total } = req.body;
  const validateTransactionQuery =
    "SELECT id FROM transactions WHERE id = ? AND status = 'pending'";
  db.query(validateTransactionQuery, [transaction_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid or expired transaction_id" });
    }
    db.query(
      "INSERT INTO carts (transaction_id, user_id, product_id, amount, total) VALUES (?, ?, ?, ?, ?)",
      [transaction_id, user_id, product_id, amount, total],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Cart item added", id: result.insertId });
      }
    );
  });
});

// PUT update cart
router.put("/:id", (req, res) => {
  const { transaction_id, user_id, product_id, amount, total } = req.body;
  db.query(
    "UPDATE carts SET transaction_id = ?, user_id = ?, product_id = ?, amount = ?, total = ? WHERE id = ?",
    [transaction_id, user_id, product_id, amount, total, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Cart updated" });
    }
  );
});

// DELETE cart item by ID
router.delete("/:id", (req, res) => {
  const cartId = req.params.id;
  db.query("DELETE FROM carts WHERE id = ?", [cartId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted" });
  });
});

module.exports = router;
