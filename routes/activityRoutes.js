import express from "express";
import {
  getActivities,
  getActivity,
  addActivity,
  deleteActivity,
} from "../controllers/activityController.js";
import logInAuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/activities", getActivities);
router.get("/activities/:id", getActivity);

// Protected routes (require authentication)
router.post("/activities", logInAuthMiddleware, addActivity);
router.delete("/activities/:id", logInAuthMiddleware, deleteActivity);

export default router;
