import catchAsync from "../middleware/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import { s3Upload } from "../utils/s3Service.js";

const registerUser = catchAsync(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!req.file || !req.file.buffer) {
    throw new AppError("No file or empty file uploaded", 400);
  }

  const data = await s3Upload(req.file);

  const user = new User({
    email,
    username,
    password,
    userImage: data.Location,
  });

  const newUser = await user.save();
  generateToken(res, newUser._id);
  res.status(201).json(newUser);
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    return next(new AppError("Invalid email or password", 401));
  }
});

const logoutUser = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

export { loginUser, registerUser, logoutUser };
