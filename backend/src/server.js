const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Load env vars
dotenv.config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", process.env.CLIENT_URL].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Root route
app.get("/", (req, res) => {
  res.json({
    name: "Aura Gems Jewelry API Server",
    status: "active",
    database: "MongoDB Atlas Connected",
    endpoints: {
      health: "http://localhost:5000/api/health",
      products: "http://localhost:5000/api/products",
      categories: "http://localhost:5000/api/products/categories",
      orders: "http://localhost:5000/api/orders",
      auth: "http://localhost:5000/api/auth",
      users: "http://localhost:5000/api/users",
    },
    note: "Frontend web store runs on http://localhost:3000",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Aura Gems API Server is healthy and running",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  ✦ Aura Gems Jewelry Backend Server Started ✦  `);
  console.log(`  Port: http://localhost:${PORT}                `);
  console.log(`  Health: http://localhost:${PORT}/api/health   `);
  console.log(`  Brevo Email: smtp-relay.brevo.com:587 (Active)`);
  console.log(`===============================================`);
});

module.exports = app;
