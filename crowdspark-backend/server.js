require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🌐 Route Imports
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaigns");
const commentRoutes = require("./routes/comments");
const updateRoutes = require("./routes/updates");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");

// ✅ Import your User model to sync indexes
const User = require("./models/user");

const app = express();

// 🛡️ CORS setup for local + production
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigin = isProduction
  ? "https://your-frontend-domain.com" // Replace with your actual domain
  : "http://localhost:5173";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

// 📌 Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// 🧠 MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // 🔄 Sync indexes for User schema
    await User.syncIndexes();
    console.log("🔧 User indexes synced successfully");

    // 🚀 Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });