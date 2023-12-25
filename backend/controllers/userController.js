import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../middleware/catchAsync.js";

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

export { getCurrentUserData, getUserById };
