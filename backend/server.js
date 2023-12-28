import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import carsRouter from "./routes/carsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import connectDB from "./config/db.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

dotenv.config();


connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());

app.use(cors({credentials: true, origin: ["http://localhost:5173", "https://renlty.onrender.com"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", carsRouter);
app.use("/api/users", usersRouter);






if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../client/dist'); 

  app.use(express.static(clientDistPath));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
