import express from "express";
import { sendEmail } from "../config/email.js";

const router = express.Router();

// ============================================
// CONTACT FORM ROUTE
// ============================================

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, timeline, details } = req.body;

    // Validate required fields
    if (!name || !email || !service) {
      console.log("❌ Validation failed: Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Name, email, and service are required",
      });
    }

    console.log("✅ Validation passed. Sending email...");

    // Send email
    const result = await sendEmail({
      name,
      email,
      phone,
      service,
      timeline,
      details,
    });
    console.log("✅ Email sent successfully:", result);

    res.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send email. Please try again.",
    });
  }
});

export default router;
