import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import aiRoutes from "./routes/Ai.routes.js";



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
try {
  connectDB();
} catch (error) {
  console.log("DB connection failed (continuing without DB):", error.message);
}

// Routes
app.use("/api/ai", aiRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Jarvis OS API is running 🚀");
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});