// Import library JWT untuk verifikasi token
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware untuk memverifikasi token JWT dari header Authorization
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    // Jika valid, simpan data user dari token ke objek req (request)
    req.user = user; // ✅ Sekarang kita bisa akses user.id, user.role, dll. di route selanjutnya
    next(); // Lanjut ke route berikutnya
  });
};

module.exports = { verifyToken };
