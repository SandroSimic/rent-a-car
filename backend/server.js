import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import carsRouter from "./routes/carsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import connectDB from "./config/db.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

connectDB();
const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://rently-h8vt.onrender.com"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);


const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 10000;
app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
