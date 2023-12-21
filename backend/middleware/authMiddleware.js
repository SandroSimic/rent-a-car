import jwt from "jsonwebtoken";
import catchAsync from "./catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

const protect = catchAsync(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  console.log(token)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      return next(new AppError("Not authorized, token failed"), 401);
    }
  } else {
    return next(new AppError("Not authorized, no token"), 401);
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new AppError("Not authorized as admin"), 401);
  }
};

export { admin, protect };
