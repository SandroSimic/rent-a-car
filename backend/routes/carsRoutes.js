import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCar,
  updateCar,
} from "../controllers/carsController.js";
import { compressImage, upload } from "../utils/uploadImage.js";

const router = express.Router();

router.route("/").get(getAllCars).post(upload.single("image"), compressImage,createCar);
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar);

export default router;
