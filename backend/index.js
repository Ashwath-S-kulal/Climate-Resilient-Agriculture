import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import chatbotRoutes from "./routes/chatbot.route.js";
import cookieParser from "cookie-parser";
import predictionRoutes from "./routes/prediction.route.js";
import riskcalculateRoutes from "./routes/riskCalculator.route.js"
import cropReccomender from "./routes/cropRecommender.route.js"
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser()); 

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);  


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", chatbotRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/calculate", riskcalculateRoutes);
app.use("/api/reccomender", cropReccomender);


app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message, statusCode });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});


mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
