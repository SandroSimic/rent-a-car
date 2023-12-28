import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import {
  deleteUser,
  getAllUsers,
  getCurrentUserData,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { compressImage, upload } from "../utils/uploadImage.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.post("/logout", logoutUser);

router.route("/").get(protect, admin, getAllUsers);

router
  .route("/register")
  .post(upload.single("userImage"), compressImage, registerUser);

router.route("/me").get(protect, getCurrentUserData);
router
  .route("/:userId")
  .get(getUserById)
  .delete(protect, admin, deleteUser)
  .patch(protect, admin, upload.single("userImage"), compressImage, updateUser);

export default router;
