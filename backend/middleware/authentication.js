const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// CHECKING TOKEN RECEIVED FROM BROWSWER AND IF YES AUTHENTICATING USER
exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  req.user = user;
  next();
});

// MIDDLEWARE TO CHECK EACH AUTHORIZED ROLE ACCESS THEIR ROUTE
exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("Your role is not authorized to access this resource", 403)
      );
    }
    next();
  };
};
