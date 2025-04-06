
const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");

// Import and use product routes
const authRoutes = require('./routes/authRoutes');
const dogchewRoutes = require("./routes/dogchewRoutes");
const InteractiveToyRoutes = require("./routes/InteractiveToyRoutes")
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});



app.use("/api", authRoutes);
app.use("/api/products", dogchewRoutes);
app.use("/api/interactive_toy",InteractiveToyRoutes);
app.use("/api/address",addressRoutes);
app.use("/api",orderRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
