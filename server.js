import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import reviewRoutes from './routes/reviewRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", tourRoutes);
app.use('/reviews' , reviewRoutes);
app.use('/booking' , bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
