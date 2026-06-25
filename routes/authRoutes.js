import express from "express";
import {
  registerTourist,
  logInTourist,
  registerGuide,
  loginGuide,
} from "../controllers/authController.js";

const router = express.Router();

/******************************Tourist router******************************/
// Register a new Tourist

router.post("/tourist/register", registerTourist);
router.post("/tourist/login", logInTourist);

/******************************Guide router******************************/
// Register a new Guide
router.post("/guides/register", registerGuide);
router.post("/guides/login", loginGuide);

export default router;
