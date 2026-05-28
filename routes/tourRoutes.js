import express from "express";
import {
  addTour,
  getTours,
  getOneTour,
} from "../controllers/tourController.js";

const router = express.Router();

router.post("/add-tour", addTour);
router.get("/Tours", getTours);
router.get("/Tours/:id", getOneTour);

export default router;
