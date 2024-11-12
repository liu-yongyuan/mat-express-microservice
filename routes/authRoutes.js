import express from "express";
import { login, registration } from "../controllers/authController.js";
import { serverConfig } from "../app.js";

const router = express.Router();

router.post(`${serverConfig.baseUrl}/login`, login);

router.post(`${serverConfig.baseUrl}/registration`, registration);

export default router;
