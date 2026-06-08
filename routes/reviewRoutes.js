import express from "express";
import { addReview , getReviewsWithUserId ,RemoveReview , getReviewsWithPlace } from "../controllers/reviewsController.js";

import logInAuthMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/", addReview);

router.get("/place/:place", getReviewsWithPlace);

router.get("/user/:id", getReviewsWithUserId);

router.delete("/:id", logInAuthMiddleware, RemoveReview);

export default router;