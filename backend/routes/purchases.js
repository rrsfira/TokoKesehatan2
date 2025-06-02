const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware"); // Middleware untuk autentikasi JWT

// Endpoint untuk mengambil semua transaksi pembelian berdasarkan user yang login
router.get("/purchases", verifyToken, (req, res) => {
  const userId = req.user.id; // Ambil ID user dari token JWT yang telah diverifikasi

  // Query untuk mengambil data transaksi milik user

  const query = `
    SELECT id, total, status, method, created_at AS date 
    FROM transactions 
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.error("Gagal mengambil data transaksi:", err);
      return res.status(500).json({ message: "Gagal mengambil data" });
    }

    try {
      const purchasesWithItems = await Promise.all(
        results.map(async (transaction) => {
          const itemsQuery = `
            SELECT 
              p.name, 
              p.price, 
              c.amount AS quantity,
              c.total AS total
            FROM carts c
            JOIN products p ON c.product_id = p.id
            WHERE c.transaction_id = ?
          `;

          const [items] = await db
            .promise()
            .query(itemsQuery, [transaction.id]);

          return {
            id: transaction.id,
            total: parseFloat(transaction.total),
            status: transaction.status,
            date: transaction.date,
            items,
            method: transaction.method,
          };
        })
      );

      res.json(purchasesWithItems);
    } catch (e) {
      console.error("Gagal mengambil item pembelian:", e);
      res.status(500).json({ message: "Gagal mengambil detail pembelian" });
    }
  });
});

module.exports = router;
