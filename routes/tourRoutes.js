import express from "express";
import {
  addTour,
  getTours,
  getOneTour,
} from "../controllers/tourController.js";

import {logInAuthMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add-tour",logInAuthMiddleware , addTour);
router.get("/Tours",logInAuthMiddleware ,  getTours);
router.get("/Tours/:Tour_ID",logInAuthMiddleware , getOneTour);

export default router;
