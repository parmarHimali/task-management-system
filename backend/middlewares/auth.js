import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { catchAsyncError } from "./catchAsyncError.js";
import User from "../model/userModel.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  if (!tokenUser) {
    return next(new ErrorHandler("User not authorized", 400));
  }
  try {
    const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return next(new ErrorHandler("User not authorized", 400));
  }
});
