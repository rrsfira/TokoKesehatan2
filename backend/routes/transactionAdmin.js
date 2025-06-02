// Import library yang dibutuhkan
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Import koneksi ke database

// Endpoint untuk mengambil semua transaksi (khusus admin)
router.get("/", (req, res) => {
  // Query SQL untuk mengambil data transaksi, termasuk nama user
  const sql = `
    SELECT t.id, u.name, t.status, t.payment, t.total, t.method, t.created_at
    FROM transactions t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});

router.get("/:transactionId/items", async (req, res) => {
  const { transactionId } = req.params;
  
  try {
    // Ambil data cart berdasarkan transaction_id
    const query = `
      SELECT c.*, p.product_name, p.price
      FROM carts c
      JOIN products p ON c.product_id = p.id
      WHERE c.transaction_id = ?
    `;
    const [items] = await db.execute(query, [transactionId]);

    // Kirimkan data barang transaksi
    res.json(items);
  } catch (error) {
    console.error("Error fetching transaction items:", error);
    res.status(500).json({ message: "Error fetching transaction items" });
  }
});

module.exports = router;
