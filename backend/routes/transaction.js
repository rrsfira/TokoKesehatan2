const express = require('express');
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

// GET all transactions
router.get('/', (req, res) => {
  db.query('SELECT * FROM transactions', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET transaction by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM transactions WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// POST new transaction
router.post('/', (req, res) => {
  const { user_id, shipping_method_id, payment, total, token, method } = req.body;

  // Tetapkan status berdasarkan metode pembayaran
  let status = 'pending';
  if (method === 'COD (Bayar di Tempat)') {
    status = 'menunggu';
  }

  db.query(
    'INSERT INTO transactions (user_id, shipping_method_id, status, payment, total, token, method) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user_id, shipping_method_id, status, payment, total, token, method],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Transaction added', id: result.insertId });
    }
  );
});


// PUT update transaction
router.put('/:id', (req, res) => {
  const fields = [];
  const values = [];

  for (let key in req.body) {
    fields.push(`${key} = ?`);
    values.push(req.body[key]);
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }

  const query = `UPDATE transactions SET ${fields.join(', ')} WHERE id = ?`;
  values.push(req.params.id);

  db.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction updated' });
  });
});


// DELETE transaction
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM transactions WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction deleted' });
  });
});

// POST /create-or-get -> Cek apakah user punya transaksi pending, jika tidak maka buat baru
router.post("/create-or-get", (req, res) => {
  const { user_id } = req.body;

  const checkQuery = `SELECT * FROM transactions WHERE user_id = ? AND status = 'pending'`;
  db.query(checkQuery, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.json({ transaction_id: results[0].id });
    } else {
      const insertQuery = `INSERT INTO transactions (user_id, status) VALUES (?, 'pending')`;
      db.query(insertQuery, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ transaction_id: result.insertId });
      });
    }
  });
});

// Assuming you're handling transactions here
router.put('/:id/cancel', verifyToken, async (req, res) => {  // Replace authenticateUser with verifyToken
  const { id } = req.params;
  const user_id = req.user.id; // Access user ID from the JWT payload

  try {
    // Check if the transaction exists and belongs to the user
    const [transactionRows] = await db.promise().query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, user_id]
    );

    if (transactionRows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found or does not belong to you.' });
    }

    // Update the transaction to "canceled"
    await db.promise().query(
      'UPDATE transactions SET status = ? WHERE id = ?',
      ['canceled', id]
    );

    res.status(200).json({ message: 'Transaction canceled successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cancel transaction.' });
  }
});

// PUT /api/transactions/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query("UPDATE transactions SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


module.exports = router;
