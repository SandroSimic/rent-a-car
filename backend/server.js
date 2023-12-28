import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import carsRouter from "./routes/carsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import connectDB from "./config/db.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cors from "cors";
import path from 'path'

dotenv.config();

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);



app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

const currentFilePath = new URL(import.meta.url).pathname;
const currentDirPath = path.dirname(currentFilePath);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(currentDirPath, '/client/dist')))

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(currentDirPath, 'client', 'dist', 'index.html'))
  })
}
else {
  app.get('/', (req,res) => {
    res.send('Api is running....')
  })
}

app.use(globalErrorHandler);

app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
