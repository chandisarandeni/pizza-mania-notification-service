import express from "express";
import sendWelcome from "../controllers/SendWelcomeController.js";

const SendWelcomeRoute = express.Router();

SendWelcomeRoute.post("/send-welcome", sendWelcome);

export default SendWelcomeRoute;
