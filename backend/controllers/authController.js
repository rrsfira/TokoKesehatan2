// Mengimpor library untuk hashing password dan membuat token
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
// Memuat variabel dari file .env (misalnya JWT_SECRET)
require("dotenv").config();

// Fungsi untuk mendaftarkan user baru
exports.register = async (req, res) => {
  // Mengambil data dari body request
  const {
    name,
    email,
    password,
    role,
    gender,
    birth,
    address,
    city,
    contact,
    bill,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Name, email, password, and role are required" });
  }

  const validRoles = ["user", "admin"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (
        role, name, email, password, gender, birth, address, city, contact, bill, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const values = [
      role,
      name,
      email,
      hashedPassword,
      gender,
      birth,
      address,
      city,
      contact,
      bill,
    ];

    const [result] = await db.promise().query(sql, values); // ✅ ambil insertId

    const token = jwt.sign(
      { id: result.insertId, role },
      process.env.JWT_SECRET || "secretKey",
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fungsi untuk login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Cari user berdasarkan email
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      // Jika user tidak ditemukan
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];
      // Bandingkan password input dengan password di database
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        token,
        role: user.role,
        name: user.name,
        user_id: user.id,
      });
    }
  );
};
