import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import {
  getCurrentUserData,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { compressImage, upload } from "../utils/uploadImage.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.post("/logout", logoutUser);

router
  .route("/register")
  .post(upload.single("userImage"), compressImage, registerUser);

router.route("/me").get(protect, getCurrentUserData);

router.route("/:userId").get(getUserById);

export default router;
