const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const products = require("./data/products.json");

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB Atlas");

    console.log("Cleaning existing products and sample data...");
    await Product.deleteMany({});
    
    console.log(`Inserting ${products.length} jewelry products into MongoDB...`);
    await Product.insertMany(products);
    console.log("✓ All products inserted successfully");

    // Create default admin user if not exists
    const adminExists = await User.findOne({ email: "admin@auragems.com" });
    if (!adminExists) {
      await User.create({
        name: "Aura Gems Admin",
        email: "admin@auragems.com",
        password: "adminpassword123",
        role: "admin",
        phone: "+91 9876543210",
      });
      console.log("✓ Demo Admin account created (admin@auragems.com / adminpassword123)");
    }

    console.log("\n==========================================");
    console.log("  ✦ DATABASE SEEDED SUCCESSFULLY TO ATLAS ✦  ");
    console.log("==========================================");
    process.exit(0);
  } catch (error) {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
