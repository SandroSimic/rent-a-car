import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from "../controllers/carsController.js";

const router = express.Router();

router.route("/").get(getAllCars).post(createCar);
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar);

export default router;
