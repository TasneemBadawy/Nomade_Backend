import express from "express";
import {
  registerTourist,
  logInTourist,
  registerGuide,
  logInGuide,
} from "../controllers/authController.js";

const router = express.Router();

/******************************Tourist router******************************/
// Register a new Tourist

router.post("/tourist/register", registerTourist);
router.post("/tourist/login", logInTourist);

/******************************Guide router******************************/
// Register a new Guide
router.post("/guide/register", registerGuide);
router.post("/guide/login", logInGuide);

export default router;
