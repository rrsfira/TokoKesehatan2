const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middleware/authMiddleware');

// GET user profile
router.get('/', verifyToken, (req, res) => {
  const userId = req.user.id;

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json(results[0]);
  });
});

// GET user address
// GET user address and additional info
router.get('/address/:user_id', verifyToken, (req, res) => {
  const { user_id } = req.params;

  db.query(
    'SELECT name, contact, email, address, city FROM users WHERE id = ?',
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Gagal mengambil alamat dan informasi' });
      if (results.length === 0) return res.status(404).json({ message: 'Data tidak ditemukan' });

      res.json(results[0]);
    }
  );
});

// UPDATE user address and additional info
router.put('/address/:user_id', verifyToken, (req, res) => {
  const { user_id } = req.params;
  const { name, contact, email, address, city } = req.body;

  db.query(
    'UPDATE users SET name = ?, contact = ?, email = ?, address = ?, city = ? WHERE id = ?',
    [name, contact, email, address, city, user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Gagal memperbarui alamat dan informasi' });

      res.json({ message: 'Alamat dan informasi berhasil diperbarui' });
    }
  );
});


module.exports = router;
