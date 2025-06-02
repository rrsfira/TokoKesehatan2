// Import library express dan buat router
const express = require('express');
const router = express.Router();

// Import fungsi register dan login dari controller authController
const { register, login } = require('../controllers/authController');

// Endpoint untuk register, menghubungkan ke fungsi register di controller
router.post('/register', register);

// Endpoint untuk login, menghubungkan ke fungsi login di controller
router.post('/login', login);

// Ekspor router untuk digunakan di file lain
module.exports = router;
