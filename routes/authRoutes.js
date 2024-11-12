import express from "express";
import { login, registration } from "../controllers/authController.js";

const router = express.Router();

const baseUrl = process.env.API_BASEURL;

router.post(`${baseUrl}/login`, login);

router.post(`${baseUrl}/registration`, registration);

export default router;
