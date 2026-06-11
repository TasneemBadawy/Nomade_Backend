import express from "express";
import {
  addTour,
  getTours,
  getOneTour,
  deleteTour,
} from "../controllers/tourController.js";
import logInAuthMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.post("/add-tour",logInAuthMiddleware , adminMiddleware,  addTour);
router.get("/Tours", getTours);
router.get("/get_Tour/:Tour_ID", getOneTour);
router.delete("/delete_Tour/:Tour_ID", deleteTour);
export default router;
