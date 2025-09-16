import express from "express";
import sendOtp from "../controllers/SendOtpController.js";

const SendOtpRoute = express.Router();

SendOtpRoute.post("/send-otp", sendOtp);

export default SendOtpRoute;
