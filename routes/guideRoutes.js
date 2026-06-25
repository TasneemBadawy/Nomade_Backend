import express from "express";
import {
  registerGuide,
  loginGuide,
  getGuides,
  getGuide,
  updateGuide,
} from "../controllers/guideController.js";
import logInAuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/guides/register", registerGuide);
router.post("/guides/login", loginGuide);
router.get("/guides", getGuides);
router.get("/guides/:id", getGuide);

// Protected routes (require authentication)
router.put("/guides/:id", logInAuthMiddleware, updateGuide);

export default router;
