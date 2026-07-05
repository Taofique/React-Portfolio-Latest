import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import contactRoutes from "./routes/contactRoutes.js";

// Get the directory name (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend folder
dotenv.config({ path: join(__dirname, ".env") });

import blogRoutes from "./routes/blogRoutes.js";
import User from "./models/User.model.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json());

// ============================================
// ROUTES
// ============================================

app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

// ============================================
// SERVE BUILT REACT FRONTEND (dist folder)
// ============================================

const distPath = join(__dirname, "..", "dist");
app.use(express.static(distPath));

// Catch-all: any route that isn't /api/* returns the React app,
// so React Router can handle client-side routes (e.g. /blog, /blog/:id)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

// ============================================
// CREATE ADMIN USER
// ============================================

const createAdmin = async () => {
  try {
    console.log("🔍 Checking for admin user...");
    console.log("📧 Email:", process.env.ADMIN_EMAIL);
    console.log(
      "🔑 Password:",
      process.env.ADMIN_PASSWORD ? "✅ Set" : "❌ Not set",
    );

    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExists) {
      console.log("📝 Creating admin user...");
      const admin = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: "Admin",
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin user created successfully");
    } else {
      console.log("✅ Admin user already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    console.error("📚 Stack trace:", error.stack);
  }
};

// ============================================
// CONNECT TO MONGODB
// ============================================

const startServer = async () => {
  try {
    // Check if MongoDB URI exists
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI is not defined in .env file");
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Create admin user
    await createAdmin();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API endpoint: http://localhost:${PORT}/api/blogs`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error.message);
    process.exit(1);
  }
};

// Start the server
startServer();

// ============================================
// ERROR HANDLING
// ============================================

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error.message);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error.message);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error.message);
    process.exit(1);
  }
});
