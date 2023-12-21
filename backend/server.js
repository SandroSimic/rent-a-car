import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import carsRouter from "./routes/carsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import connectDB from "./config/db.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const allowedOrigins = ['http://localhost:5173']; 
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/cars", carsRouter);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
