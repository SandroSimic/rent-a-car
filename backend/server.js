import express from "express";
import dotenv from "dotenv";
import carsRouter from "./routes/carsRoutes.js";
import connectDB from "./config/db.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", carsRouter);

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
