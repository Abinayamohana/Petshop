const express = require("express");
const mysql = require("mysql2/promise");


const router = express.Router();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Abinaya@2003",
  database: "petstore",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/admin/orders", async (req, res) => {
  try {
      const [orders] = await db.query(
          `SELECT o.id AS order_id, o.user_id, o.total_price, o.order_date, 
                  a.name, a.email, a.phonenumber, a.address
           FROM orders o
           JOIN address a ON o.user_id = a.user_id`
      );

      for (let order of orders) {
          const [items] = await db.query(
              "SELECT product_name, price, quantity FROM order_items WHERE order_id = ?",
              [order.order_id]
          );
          order.items = items;
      }

      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/orders/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
      const [orders] = await db.query(
          `SELECT id AS order_id, total_price, order_date FROM orders WHERE user_id = ?`,
          [userId]
      );

      for (let order of orders) {
          const [items] = await db.query(
              "SELECT product_name, price, quantity FROM order_items WHERE order_id = ?",
              [order.order_id]
          );
          order.items = items;
      }

      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/checkout", async (req, res) => {
  const { userData, cartSummary } = req.body;
  
  console.log("Received Checkout Data:", req.body); // Debugging

  if (!userData || !userData.id || !cartSummary.length) {
      return res.status(400).json({ error: "Invalid order details" });
  }

  const connection = await db.getConnection();
  try {
      await connection.beginTransaction();

      console.log("User ID:", userData.id);

      // Check if address exists
      const [existingAddress] = await connection.query(
          "SELECT * FROM address WHERE user_id = ?", [userData.id]
      );

      console.log("Existing Address:", existingAddress);

      if (existingAddress.length === 0) {
          await connection.query(
              "INSERT INTO address (user_id, name, email, phonenumber, address) VALUES (?, ?, ?, ?, ?)",
              [userData.id, userData.name, userData.email, userData.phonenumber, userData.address]
          );
      } else {
          await connection.query(
              "UPDATE address SET name=?, email=?, phonenumber=?, address=? WHERE user_id=?",
              [userData.name, userData.email, userData.phonenumber, userData.address, userData.id]
          );
      }

      const totalPrice = cartSummary.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
      
      console.log("Total Price:", totalPrice);

      const [orderResult] = await connection.query(
          "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
          [userData.id, totalPrice]
      );

      const orderId = orderResult.insertId;

      for (const item of cartSummary) {
          const quantity = item.quantity || 1;
          await connection.query(
              "INSERT INTO order_items (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)",
              [orderId, item.name, item.price, quantity ]
          );
      }

      await connection.commit();
      connection.release();
      
      console.log("Order Placed Successfully:", orderId);
      res.status(201).json({ message: "Order placed successfully", orderId });

  } catch (error) {
      await connection.rollback();
      connection.release();
      console.error("Checkout error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

 module.exports = router;
