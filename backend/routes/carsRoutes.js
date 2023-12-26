import express from "express";
import {
  createCar,
  createCarReview,
  deleteCar,
  getAllCars,
  getCar,
  getMyCars,
  getUsersCars,
  updateCar,
} from "../controllers/carsController.js";
import { compressImage, upload } from "../utils/uploadImage.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/me").get(protect, getMyCars);
router.route("/usersCars/:userId").get(protect, getUsersCars);

router
  .route("/")
  .get(getAllCars)
  .post(protect, upload.single("image"), compressImage, createCar);
router
  .route("/:id")
  .get(getCar)
  .patch(protect, upload.single("image"), compressImage, updateCar)
  .delete(deleteCar);

router.route("/:id/reviews").post(protect, createCarReview);
export default router;
