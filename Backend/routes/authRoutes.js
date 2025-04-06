const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abinaya@2003",
  database: "petstore",
});

db.connect((err) => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL database - Auth Routes");
});

// User Registration API
router.post("/users", async (req, res) => {
    const { name, email, phonenumber, password } = req.body;

    // Check if the email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmailQuery, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Encrypt the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, phonenumber, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, phonenumber, hashedPassword], (err) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json({ success: true, message: "User registered successfully" });
        });
    });
});

// User Login API
// router.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     // Admin Login
//     if (email === "admin@gmail.com" && password === "admin@123") {
//         const token = jwt.sign({ role: "admin" }, "secretKey", { expiresIn: "1h" });
//         return res.json({ success: true, role: "admin", token });
//     }

//     // User Login
//     const sql = "SELECT * FROM users WHERE email = ?";
//     db.query(sql, [email], async (err, result) => {
//         if (err) return res.status(500).json({ error: "Database error" });

//         if (result.length > 0) {
//             const isMatch = await bcrypt.compare(password, result[0].password);
//             if (isMatch) {
                
//                 const token = jwt.sign({ role: "user" }, "secretKey", { expiresIn: "1h" });
//                 return res.json({ success: true, role: "user", token });
//             }
//         }
//         res.status(401).json({ error: "Invalid email or password" });
//     });
// });
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "admin@123") {
        const token = jwt.sign({ role: "admin" }, "secretKey", { expiresIn: "1h" });
        return res.json({ success: true, role: "admin", token });
    }

    const sql = "SELECT id, name, email, phonenumber, password FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length > 0) {
            const isMatch = await bcrypt.compare(password, result[0].password);
            if (isMatch) {
                const user = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email,
                    phonenumber: result[0].phonenumber,
                };

                const token = jwt.sign({ role: "user" }, "secretKey", { expiresIn: "1h" });
                return res.json({ success: true, role: "user", token, user });
            }
        }
        res.status(401).json({ error: "Invalid email or password" });
    });
});


// Fetch all users (Admin Only)
router.get("/users", (req, res) => {
    db.query("SELECT id, name, phonenumber, email FROM users", (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(result);
    });
});

module.exports = router;
