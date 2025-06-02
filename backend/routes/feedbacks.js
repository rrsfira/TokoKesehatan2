const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

// Mendapatkan daftar feedbacks
router.get("/", (req, res) => {
  const query = `
    SELECT f.id, f.description, f.created_at, u.name AS user_name
    FROM feedbacks f
    JOIN users u ON f.user_id = u.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching feedbacks:", err);
      res.status(500).json({ error: "Error fetching feedbacks" });
    } else {
      res.json(results);
    }
  });
});

// Mengirim feedback (POST)
// POST - Mengirim feedback (dengan token valid)
router.post("/", verifyToken, (req, res) => {
  const { feedbacks } = req.body;

  if (!Array.isArray(feedbacks)) {
    return res.status(400).json({ message: "Invalid feedback format" });
  }

  const values = feedbacks
    .filter((fb) => fb.description)
    .map((fb) => [fb.description, req.user.id]);

  if (values.length === 0) {
    return res.status(400).json({ message: "No valid feedbacks provided" });
  }

  const query = "INSERT INTO feedbacks (description, user_id) VALUES ?";

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Error saving feedbacks:", err);
      return res.status(500).json({ message: "Error saving feedbacks" });
    }
    res.status(200).json({ message: "Feedbacks saved successfully" });
  });
});

module.exports = router;
