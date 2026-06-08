import express from "express";
import { addBooking , getUserBookings , removeBooking } from "../controllers/bookingController.js";

import logInAuthMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/" , logInAuthMiddleware , addBooking);

router.get("/user/:id" , logInAuthMiddleware , getUserBookings);

router.delete("/:id" , logInAuthMiddleware , removeBooking);

export default router;
