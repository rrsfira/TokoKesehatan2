const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Menentukan folder tempat menyimpan file upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validasi ekstensi file yang diizinkan (jpeg, jpg, png)
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb("Only JPEG, JPG, and PNG files are allowed");
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimum ukuran file: 2MB
});

// GET all products
router.get("/products", (req, res) => {
  const query = `
    SELECT products.id, products.name, products.description, products.image, products.category_id, products.price, categories.name AS category_name
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    ORDER BY products.id DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch products" });
    res.json(results);
  });
});

// Ambil data produk berdasarkan ID
router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT products.id, products.name, products.description, products.image,
           products.category_id, products.price, categories.name AS category_name
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch product" });
    if (results.length === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json(results[0]);
  });
});

// CREATE product
router.post("/products", upload.single("image"), (req, res) => {
  const { name, description, category_id, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !category_id || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO products (name, description, image, category_id, price, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;
  db.query(
    query,
    [name, description, image, category_id, price],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to create product" });
      res
        .status(201)
        .json({ message: "Product created successfully", id: result.insertId });
    }
  );
});

// UPDATE product
router.put("/products/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, description, category_id, price } = req.body;
  const newImage = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || !category_id || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (newImage) {
    const getOldImage = "SELECT image FROM products WHERE id = ?";
    db.query(getOldImage, [id], (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to fetch old image" });

      const oldImage = result[0]?.image;
      if (oldImage) {
        const fullPath = path.join(__dirname, "..", oldImage);
        fs.unlink(fullPath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }

      const query = `
        UPDATE products 
        SET name = ?, description = ?, image = ?, category_id = ?, price = ?, updated_at = NOW()
        WHERE id = ?
      `;
      db.query(
        query,
        [name, description, newImage, category_id, price, id],
        (err, result) => {
          if (err)
            return res.status(500).json({ error: "Failed to update product" });
          res.json({ message: "Product updated successfully" });
        }
      );
    });
  } else {
    const query = `
      UPDATE products 
      SET name = ?, description = ?, category_id = ?, price = ?, updated_at = NOW()
      WHERE id = ?
    `;
    db.query(
      query,
      [name, description, category_id, price, id],
      (err, result) => {
        if (err)
          return res.status(500).json({ error: "Failed to update product" });
        res.json({ message: "Product updated successfully" });
      }
    );
  }
});

// DELETE product
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  // Ambil image path sebelum delete
  const getImage = "SELECT image FROM products WHERE id = ?";
  db.query(getImage, [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Failed to find product image" });

    const image = result[0]?.image;
    if (image) {
      const fullPath = path.join(__dirname, "..", image);
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Failed to delete image file:", err);
      });
    }

    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
      if (err)
        return res.status(500).json({ error: "Failed to delete product" });
      res.json({ message: "Product deleted successfully" });
    });
  });
});

module.exports = router;
