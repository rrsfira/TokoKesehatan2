const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all categories
// Endpoint: GET /categories
// Mengambil semua kategori dari database dan mengurutkannya berdasarkan id secara menurun
router.get("/categories", (req, res) => {
  const query = "SELECT * FROM categories ORDER BY id DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);// Menampilkan error di console (jika ada)
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

// CREATE category
// Endpoint: POST /categories
// Menambahkan kategori baru ke database dengan waktu saat ini sebagai created_at dan updated_at
router.post("/categories", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO categories (name, created_at, updated_at) VALUES (?, NOW(), NOW())";

  db.query(query, [name], (err, result) => {
    if (err) {
      console.error("Error creating category:", err);
      return res.status(500).json({ error: "Failed to create category" });
    }
    res.status(201).json({ message: "Category created successfully", id: result.insertId });
  });
});

// UPDATE category
router.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = "UPDATE categories SET name = ?, updated_at = NOW() WHERE id = ?";

  db.query(query, [name, id], (err, result) => {
    if (err) {
      console.error("Error updating category:", err);
      return res.status(500).json({ error: "Failed to update category" });
    }
    res.json({ message: "Category updated successfully" });
  });
});

// DELETE category
router.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM categories WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting category:", err);
      return res.status(500).json({ error: "Failed to delete category" });
    }
    res.json({ message: "Category deleted successfully" });
  });
});

module.exports = router;
