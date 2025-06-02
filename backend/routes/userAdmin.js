// Import library express dan inisialisasi router
const express = require("express");
const router = express.Router();

// Import koneksi database dari file konfigurasi
const db = require("../config/db");

// Route GET untuk mengambil seluruh data pengguna
// Route GET untuk mengambil seluruh data pengguna (kecuali role admin)
router.get("/", (req, res) => {
  // Query SQL dengan pengecualian untuk role admin
  const sql =
    "SELECT id, name, email, gender, address, contact, bill FROM users WHERE role != 'admin'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

// Ambil user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(results[0]);
  });
});

// Hapus user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User berhasil dihapus" });
  });
});

// Update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, gender, address, contact, bill } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, gender=?, address=?, contact=?, bill=? WHERE id=?",
    [name, email, gender, address, contact, bill, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User berhasil diupdate" });
    }
  );
});

module.exports = router;
