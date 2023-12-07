import express from "express";
import dotenv from "dotenv";
import carsRouter from "./routes/carsRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cars", carsRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
