import express from "express";
import { registerGuide , logInGuide } from "../controllers/authController";

const router = express.Router();

// Register a new Guide
router.post("/guide/register", registerGuide);
router.post("/guide/login", logInGuide);

export default router;