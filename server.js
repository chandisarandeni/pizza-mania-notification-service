import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import SendOtp from "./routes/SendOtpRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/notifications", SendOtp);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
