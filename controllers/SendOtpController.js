import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });
  }

  const mailOptions = {
    from: `"PizzaMania Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your One-Time Password (OTP) for PizzaMania",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <h2 style="color: #FF5722;">PizzaMania OTP Verification</h2>
        <p>Dear Customer,</p>
        <p>We received a request to access your PizzaMania account. Please use the following OTP to proceed:</p>
        <h3 style="background-color: #f5f5f5; display: inline-block; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">${otp}</h3>
        <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,<br><strong>PizzaMania Team</strong></p>
        <hr>
        <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} PizzaMania. All rights reserved.</p>
      </div>
    `,
    text: `PizzaMania OTP Verification\n\nDear Customer,\n\nWe received a request to access your PizzaMania account. Your OTP is: ${otp}\n\nThis OTP is valid for 10 minutes. Please do not share it with anyone.\n\nIf you did not request this, please ignore this email.\n\nThank you,\nPizzaMania Team\n© ${new Date().getFullYear()} PizzaMania. All rights reserved.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

export default router;
