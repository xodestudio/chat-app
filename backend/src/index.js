import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "FRONTEND_URL"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`ERROR: Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server with error handling
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
