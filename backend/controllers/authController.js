import catchAsync from "../utils/catchAsync.js";

const loginUser = catchAsync(async (req, res, next) => {
  res.send("Login User");
});

const registerUser = catchAsync(async (req, res, next) => {
  res.send("Register User");
});
export { loginUser, registerUser };
