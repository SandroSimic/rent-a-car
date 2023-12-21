import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

const getCurrentUserData = async (req, res, next) => {
  const userId = req.user?._id;

  if(!userId) {
    return next(new AppError("User not logged in", 404));
  }

  try {
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
  } catch (error) {
    return next(new AppError("Error fetching user data", 500));
  }
};

export { getCurrentUserData };
