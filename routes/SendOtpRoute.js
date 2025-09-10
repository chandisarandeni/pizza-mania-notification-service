import express from "express";
import sendOtp from "../controllers/SendOtpRoute.js";

const SendOtpRoute = express.Router();

SendOtpRoute.post("/send-otp", sendOtp);

export default SendOtpRoute;
