import User from "../models/userModel.js";
import Car from '../models/carModel.js'
import AppError from "../utils/appError.js";
import catchAsync from "../middleware/catchAsync.js";
import {
  deleteImageFromS3,
  s3Upload,
  updateImageInS3,
} from "../utils/s3Service.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const getCurrentUserData = catchAsync(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    return next(new AppError("User not logged in", 404));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Return user data
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    userImage: user.userImage,
    role: user.role,
  });
  return next(new AppError("Error fetching user data", 500));
});

const getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("No user with that ID", 404));
  }

  res.status(200).json(user);
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    return next(new AppError("No Users Found", 404));
  }

  res.status(200).json(users);
});

const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("Could not find user", 404));
  }

 const userCars = await Car.find({ owner: user._id });
 if (userCars.length > 0) {
   for (const car of userCars) {
     if (car.image) {
       try {
         await deleteImageFromS3(car.image);
       } catch (error) {
         return next(new AppError("Error deleting image from S3", 500));
       }
     }
     await Car.deleteOne({ _id: car._id });
   }
 }


  if (user.userImage) {
    try {
      await deleteImageFromS3(user.userImage);
    } catch (error) {
      return next(new AppError("Error deleting image from S3", 500));
    }
  }

  await User.deleteOne({ _id: user._id });
  res.status(200).json({ message: "User Deleted Successfully" });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid User Id", 404));
  }

  const existingUser = await User.findById(userId);

  if (!existingUser) {
    return next(new AppError("User not found", 404));
  }

  let updatedUserData = {
    username,
    email,
    password: password ? password : undefined,
  };

  if (req.file && req.file.buffer) {
    const data = await updateImageInS3(req.file, existingUser.userImage);

    updatedUserData = {
      ...updatedUserData,
      userImage: data || "",
    };
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedUserData.password = hashedPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
    runValidators: true,
  });

  if (!updateUser) {
    return next(new AppError("Could not Update User", 500));
  }
  res.status(200).json({ updatedUser });
});

export { getCurrentUserData, getUserById, getAllUsers, deleteUser, updateUser };
