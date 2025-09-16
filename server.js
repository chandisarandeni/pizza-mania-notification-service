import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import SendOtp from "./routes/SendOtpRoute.js";
import SendWelcome from "./routes/SendWelcomeRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/notifications", SendOtp);
app.use("/api/v1/notifications", SendWelcome);

app.listen(PORT, () => {
  console.log("✅ Server is running on port " + PORT);
});
