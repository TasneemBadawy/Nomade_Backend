import express from "express";
import {
  addTour,
  getTours,
  getOneTour,
} from "../controllers/tourController.js";

const router = express.Router();

router.post("/add-tour", addTour);
router.get("/tours", getTours);
router.get("/tours/:id", getOneTour);

export default router;