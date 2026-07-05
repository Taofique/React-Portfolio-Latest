import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend folder
dotenv.config({ path: join(__dirname, "../.env") });

console.log("=================================");
console.log("🔍 EMAIL CONFIG DEBUG:");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Set (hidden)" : "❌ Missing",
);
console.log("EMAIL_TO:", process.env.EMAIL_TO);
console.log("=================================");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
    console.error("❌ Error details:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

export const sendEmail = async ({
  name,
  email,
  phone,
  service,
  timeline,
  details,
}) => {
  console.log("📧 sendEmail called with:");
  console.log("  Name:", name);
  console.log("  Email:", email);
  console.log("  Service:", service);

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0d0d0d; color: #ffffff;">
          <h2 style="color: #FD6F00;">New Contact Form Submission</h2>
          <hr style="border-color: #333;">
          
          <h3 style="color: #FD6F00;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
          
          <h3 style="color: #FD6F00; margin-top: 20px;">Project Details:</h3>
          <p style="background: #1a1a1a; padding: 15px; border-radius: 8px; border-left: 4px solid #FD6F00;">
            ${details || "No details provided"}
          </p>
          
          <hr style="border-color: #333; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
    };

    console.log("📤 Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    console.log("📧 Response:", info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending error:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error stack:", error.stack);
    throw error;
  }
};

export default transporter;
