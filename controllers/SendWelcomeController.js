import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure transporter
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

// 📩 Send Welcome Email
const sendWelcome = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Name are required" });
  }

  const mailOptions = {
    from: `"PizzaMania Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to PizzaMania!",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <h2 style="color: #FF5722;">Welcome to PizzaMania, ${name}!</h2>
        <p>We’re thrilled to have you join our PizzaMania family.</p>
        <p>From mouthwatering pizzas to special offers, you’re in for a treat 🍕.</p>
        <p><strong>What’s next?</strong></p>
        <ul>
          <li>Start exploring our delicious menu</li>
          <li>Enjoy exclusive discounts as a member</li>
          <li>Stay tuned for exciting updates</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Enjoy your journey with PizzaMania! 🎊</p>
        <p>Cheers,<br><strong>PizzaMania Team</strong></p>
        <hr>
        <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} PizzaMania. All rights reserved.</p>
      </div>
    `,
    text: `Welcome to PizzaMania, ${name}!\n\nWe’re thrilled to have you join our PizzaMania family. From pizzas to offers, you’re in for a treat.\n\nCheers,\nPizzaMania Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Welcome email sent successfully" });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send welcome email" });
  }
};

export default sendWelcome;
