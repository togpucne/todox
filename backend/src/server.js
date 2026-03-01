import express from "express";
import tasksRoute from "./routes/tasks.route.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// Env
dotenv.config();
// Port
const PORT = process.env.PORT || 5001;
// Middleware
app.use(cors({ origin: "http://localhost:5173" }));

// Convert Json
app.use(express.json());
// Tasks Route
app.use("/api/tasks", tasksRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
