const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abinaya@2003",
  database: "petstore",
});

db.connect((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to MySQL database - DogChewRoutes");
});

// Multer Storage for Image Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Get All Products
router.get("/", (req, res) => {
  db.query("SELECT * FROM chew_product", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Get a Single Product by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM chew_product WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result[0]); // Return single product
  });
});

// Add Product
router.post("/", upload.single("image"), (req, res) => {
  const { name, price, discount, mrp, size,total_products } = req.body;
  const image = `/uploads/${req.file.filename}`;
  const sql =
    "INSERT INTO chew_product (name, price, discount, mrp, size,total_products, image) VALUES (?, ?, ?, ?, ?, ?,?)";

  db.query(sql, [name, price, discount, mrp, size,total_products, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product added successfully", id: result.insertId });
  });
});

// Update Product
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, price, discount, mrp, size,total_products } = req.body;
  let sql =
    "UPDATE chew_product SET name=?, price=?, discount=?, mrp=?, size=?,total_products=? WHERE id=?";
  let values = [name, price, discount, mrp, size,total_products, id];

  if (req.file) {
    sql =
      "UPDATE chew_product SET name=?, price=?, discount=?, mrp=?, size=?, image=?,total_products=? WHERE id=?";
    values = [
      name,
      price,
      discount,
      mrp,
      size,
      total_products,
      `/uploads/${req.file.filename}`,
      id,
    ];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated successfully" });
  });
});

// Delete Product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM chew_product WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
});

module.exports = router;

