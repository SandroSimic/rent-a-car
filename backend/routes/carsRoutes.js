import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
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
router
  .route("/:id")
  .get(getCar)
  .put(protect, upload.single("image"), compressImage, updateCar)
  .delete(deleteCar);

export default router;
