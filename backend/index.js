// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRoutes from "./routes/user.route.js";
// import authRoutes from "./routes/auth.route.js";
// import chatbotRoutes from "./routes/chatbot.route.js";
// import cookieParser from "cookie-parser";
// import riskcalculateRoutes from "./routes/riskCalculator.route.js"
// import cropReccomender from "./routes/cropRecommender.route.js"
// import supplementRoutes from "./routes/supplement.routes.js";
// import cropInfoRoutes from "./routes/cropInfo.route.js"
// import cropStepRoutes from "./routes/cropStep.route.js";
// import cropdiseaseRoutes from "./routes/cropdisease.route.js"
// import AdminRoutes from "./routes/admin.routes.js";
// import path from 'path';
// import { fileURLToPath } from 'url';


// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser()); 

// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = path.dirname(__filename);  


// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/ai", chatbotRoutes);
// app.use("/api/calculate", riskcalculateRoutes);
// app.use("/api/reccomender", cropReccomender);
// app.use("/api/supplements", supplementRoutes);
// app.use("/api/cropinfo", cropInfoRoutes);
// app.use("/api/cropsteps", cropStepRoutes);
// app.use("/api/cropdiseases", cropdiseaseRoutes);
// app.use("/api/admin", AdminRoutes);





// app.use(express.static(path.join(__dirname, '../frontend/dist')));


// app.get(/^\/(?!api\/).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });


// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({ success: false, message, statusCode });
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log("Server listening on port", PORT);
// });


// mongoose
//   .connect(process.env.MONGO)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));





import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import chatbotRoutes from "./routes/chatbot.route.js";
import cookieParser from "cookie-parser";
import riskcalculateRoutes from "./routes/riskCalculator.route.js";
import cropReccomender from "./routes/cropRecommender.route.js";
import supplementRoutes from "./routes/supplement.routes.js";
import cropInfoRoutes from "./routes/cropInfo.route.js";
import cropStepRoutes from "./routes/cropStep.route.js";
import cropdiseaseRoutes from "./routes/cropdisease.route.js";
import AdminRoutes from "./routes/admin.routes.js";
import cors from "cors";



dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']  })
);
app.options('*', cors());
dv
app.get("/", (req, res) => { res.send("Backend running"); });


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", chatbotRoutes);
app.use("/api/calculate", riskcalculateRoutes);
app.use("/api/reccomender", cropReccomender);
app.use("/api/supplements", supplementRoutes);
app.use("/api/cropinfo", cropInfoRoutes);
app.use("/api/cropsteps", cropStepRoutes);
app.use("/api/cropdiseases", cropdiseaseRoutes);
app.use("/api/admin", AdminRoutes);

export default app;
