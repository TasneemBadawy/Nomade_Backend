import express from "express";
import {
  getGuides,
  getGuide,
  updateGuide,
} from "../controllers/guideController.js";
import logInAuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/guides", getGuides);
router.get("/guides/:id", getGuide);

// Protected routes (require authentication)
router.put("/guides/:id", logInAuthMiddleware, updateGuide);

export default router;
