export const sendToken = (user, statusCode, res, message) => {
  const token = user.generateToken();

  // Ensure that COOKIE_EXPIRE is defined or fallback to a default value
  const cookieExpire = process.env.COOKIE_EXPIRE || 7; // Default to 7 days if not defined
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000), // Cookie expiry time
    httpOnly: true, // Prevent client-side access to the cookie
  };

  res.status(statusCode).cookie("tokenUser", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
