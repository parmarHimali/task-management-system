import ErrorHandler from "../middlewares/error.js";
import User from "../model/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { catchAsyncError } from "./../middlewares/catchAsyncError.js";
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill up the entire form"));
  }
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return next(new ErrorHandler("Email already exist"));
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res, "User registered successfully!");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide all details", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 200, res, "User login successfully!");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("tokenUser", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});
