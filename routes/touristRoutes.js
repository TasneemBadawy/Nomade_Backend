import express from "express";
import { registerTourist , logInTourist } from "../controllers/authController";

const router = express.Router();

/******************************Tourist router******************************/
// Register a new Tourist

router.post("/tourist/register", registerTourist);
router.post("/tourist/login", logInTourist);

export default router;