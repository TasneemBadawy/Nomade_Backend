import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";

config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", tourRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
