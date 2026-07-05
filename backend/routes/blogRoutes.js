import express from "express";
import Blog from "../models/Blog.model.js";
import User from "../models/User.model.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).select("-content");
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    blog.views += 1;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// PROTECTED ROUTES (Admin only)
// ============================================

// CREATE blog with image upload
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    console.log("📝 Creating blog...");
    console.log("📦 Body:", req.body);
    console.log("📸 File:", req.file);

    // Parse tags if they come as string
    let tags = req.body.tags;
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
    }

    const blogData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      category: req.body.category || "General",
      author: req.body.author || "Taofique Islam",
      readTime: req.body.readTime || "5 min read",
      tags: tags || [],
      image: req.file ? req.file.path : req.body.image || "/blog/default.jpg",
    };

    const blog = new Blog(blogData);
    await blog.save();

    console.log("✅ Blog created successfully");
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error("❌ Create blog error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE blog with image upload
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    console.log("📝 Updating blog:", req.params.id);
    console.log("📦 Body:", req.body);
    console.log("📸 File:", req.file);

    // Parse tags if they come as string
    let tags = req.body.tags;
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch {
        tags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
    }

    const updateData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      category: req.body.category || "General",
      author: req.body.author,
      readTime: req.body.readTime,
      tags: tags || [],
      updatedAt: Date.now(),
    };

    // Only update image if new file uploaded or URL provided
    if (req.file) {
      updateData.image = req.file.path;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    console.log("✅ Blog updated successfully");
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("❌ Update blog error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE blog
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// AUTH ROUTES
// ============================================

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Using the comparePassword method from the model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// VERIFY TOKEN ROUTE
// ============================================

router.get("/verify", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Verify error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
