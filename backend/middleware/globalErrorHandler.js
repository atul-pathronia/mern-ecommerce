const AppError = require("../../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`;
    err = new AppError(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
    err = new AppError(message, 400);
  }

  // if (err.name === "Error") {
  //   const message = `Upload all fields`;
  //   err = new AppError(message, 400);
  // }

  // Wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, Try again`;
    err = new AppError(message, 400);
  }

  // jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is Expired, Try again`;
    err = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
