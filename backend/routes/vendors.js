// Import library express dan inisialisasi router
const express = require('express');
const router = express.Router();

// Import koneksi database
const db = require("../config/db");

// ==================== VENDOR ====================

// Endpoint POST /vendors: Menambahkan data vendor baru ke database
router.post('/vendors', (req, res) => {
  // Ambil data dari body request
  const { nama_perusahaan, email, no_telepon, deskripsi_produk } = req.body;

  // Query SQL untuk menyisipkan data vendor ke tabel vendors
  const query = `INSERT INTO vendors (nama_perusahaan, email, no_telepon, deskripsi_produk) VALUES (?, ?, ?, ?)`;
  db.query(query, [nama_perusahaan, email, no_telepon, deskripsi_produk], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Vendor registered', vendor_id: result.insertId });
  });
});

router.get('/vendor', (req, res) => {
  const query = `SELECT * FROM vendors ORDER BY id DESC`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.post('/deliveries', (req, res) => {
    const { vendor_id, nama_produk, jumlah, nama_penjual_tujuan, alamat_tujuan } = req.body;
  
    const query = `INSERT INTO vendors_deliveries (vendor_id, nama_produk, jumlah, nama_penjual_tujuan, alamat_tujuan) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [vendor_id, nama_produk, jumlah, nama_penjual_tujuan, alamat_tujuan], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Barang dikirim', delivery_id: result.insertId });
    });
  });

  router.get('/deliveries', (req, res) => {
    const query = `SELECT vd.*, v.nama_perusahaan FROM vendors_deliveries vd 
                   JOIN vendors v ON vd.vendor_id = v.id 
                   ORDER BY vd.id DESC`;
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
module.exports = router;
