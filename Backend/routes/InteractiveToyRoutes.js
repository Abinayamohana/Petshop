const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const { error } = require("console");

const router = express.Router();

//Database Connection
const db =mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abinaya@2003",
  database: "petstore"
});

db.connect((err) => {
  if(err) console.error("Database connection failed:",err);
  else console.log("Connected to MySQL database - InteractiveToyRoutes");  
})

//Multer Storage for Image Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

//Get All Products
router.get("/", (req,res) => {
  db.query("SELECT * FROM interactive_toy", (err, result) => {
    if (err) return res.status(500).json({ error: err.message});
    res.json(result);
  });
});

//Get a single Product by ID
router.get("/:id", (req,res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM interactive_toy WHERE id = ?"

  db.query(sql, [id], (err, result) => {
    if(err) return res.status(500).json({error: err.message});

    if(result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result[0]);
  });
});

//Add Products
router.post("/", upload.single("image"), (req,res) => {
  const { name, price, discount, mrp, size} = req.body;
  const image = `/uploads/${req.file.filename}`;
  const sql = "INSERT INTO interactive_toy (name, price, discount, mrp, size, image) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, price, discount, mrp, size, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product added Successfully", id: result.insertId});
  });
});

//Update Product
router.put("/:id", upload.single("image"), (req,res) => {
  const { id } = req.params;
  const { name, price, discount, mrp, size } = req.body;
  let sql = "UPDATE interactive_toy SET name=?, price=?, discount=?, mrp=?, size=? WHERE id=? ";
  let values = [name, price, discount, mrp, size, id];

  if(req.file) {
    sql = "UPDATE interactive_toy SET name=?, price=?, discount=?, mrp=?, size=?, image=? WHERE id=?";
    values= [
      name,
      price,
      discount,
      mrp,
      size,
      `/uploads/${req.file.filename}`,
      id,
    ];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message});
    res.json({ message: "Product Updated successfully"});
  });
});

//Delete Product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM interactive_toy WHERE id = ?", [id], (err, result) => {
    if(err) return res.status(500).json({ error:err.message });
    res.json({ message: "Product deleted succesfully" });
  });
});

module.exports = router;