import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
const app = express();

app.use(express.json());
