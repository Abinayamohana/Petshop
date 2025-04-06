const express = require("express");
const mysql = require("mysql2");


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
  else console.log("Connected to MySQL database - addressRoutes");
});

// Save Address API
router.post("/", (req, res) => {
  console.log("Received POST request to /api/address");
  console.log("Request Body:", req.body); // Check incoming data

  const { user_id, name, email, phonenumber, address } = req.body;

  const sql = "INSERT INTO address (user_id, name, email, phonenumber, address) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [user_id, name, email, phonenumber, address], (err, result) => {
    if (err) {
      console.error("Error saving address:", err);
      res.status(500).json({ message: "Error saving address" });
    } else {
      console.log("Address saved successfully");
      res.status(200).json({ message: "Address saved successfully" });
    }
  });
});

module.exports = router;