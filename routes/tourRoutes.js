import express from "express";
import {
  addTour,
  getTours,
  getOneTour,
  deleteTour,
} from "../controllers/tourController.js";

const router = express.Router();

router.post("/add-tour", addTour);
router.get("/Tours", getTours);
router.get("/get_Tour/:Tour_ID", getOneTour);
router.delete("/delete_Tour/:Tour_ID", deleteTour);
export default router;
