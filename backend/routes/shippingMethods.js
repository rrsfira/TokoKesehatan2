const express = require('express');
const router = express.Router();
const db = require("../config/db");

router.get('/shipping-methods', (req, res) => {
  db.query('SELECT * FROM shipping_methods', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send the results as JSON
  });
});

module.exports = router;
