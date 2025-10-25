import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
