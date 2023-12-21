import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getAllCarsNoFilter,
  getCar,
  updateCar,
} from "../controllers/carsController.js";
import { compressImage, upload } from "../utils/uploadImage.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCars)
  .post(protect, upload.single("image"), compressImage, createCar);
router.route("/all-cars").get(getAllCarsNoFilter);
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar);

export default router;
