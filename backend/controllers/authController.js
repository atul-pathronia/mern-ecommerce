const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const User = require("../models/userModel");
const createAndSendtoken = require("../../utils/jwtToken");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// REGISTERING NEW USER
exports.registerUser = catchAsync(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  createAndSendtoken(user, 201, res);
});

// LOG IN USER
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email and password", 401));
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new AppError("Invalid email and password", 401));
  }

  createAndSendtoken(user, 200, res);
});

// LOG OUT USER
exports.logoutUser = (req, res, next) => {
  res.cookie("token", "", {
    expiresIn: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    messag: "Logged out successfully",
  });
};

// FORGOT PASSWORD
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Enter a mail id", 404));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // saving token from method
  const resetToken = user.getUserPasswordToken();

  // saving user reset token to user document
  await user.save({ validateBeforeSave: false });

  // creating reset password url
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  // creating reset password message
  const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore the email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password recovery",
      message,
    });

    res.status(200).json({
      status: "success",
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPassowrdExpired = undefined;
    // saving user undefiend values to user document
    await user.save({ validateBeforeSave: false });
    return next(new AppError(error.message, 500));
  }
});

// RESET PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Creating hash token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // finding user using hash token
  const user = await User.findOne({
    resetPasswordToken,
    resetPassowrdExpired: { $gt: Date.now() },
  });

  if (!req.body.password || !req.body.confirmPassword) {
    return next(
      new AppError(
        `${
          !req.body.password ? "Password" : "Confirm password"
        } is an empty string`,
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Password does not match", 400));
  }

  // User not found
  if (!user) {
    return next(new AppError("Reset password link expired", 400));
  }

  // User found now checking for Password comparision

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPassowrdExpired = undefined;

  // Saving user document with updated passowrd
  await user.save();

  // Sending token to keep the user logged in
  createAndSendtoken(user, 200, res);
});

// GET USER PROFILE DETAILS
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    user,
  });
});

// UPDATE USER PASSWORD BY USER
exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new AppError("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new AppError("Password does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  createAndSendtoken(user, 200, res);
});

// UPDATE USER PROFILE DETAILS BY USER
exports.updateProfile = catchAsync(async (req, res, next) => {
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  let user = await User.findById(req.user.id);

  if (req.body.avatar !== user.avatar.url) {
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    updatedUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    // data: {
    //   user,
    // },
  });
});

// ADMIN ROLE - GET ALL USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    users,
  });
});

// ADMIN ROLE - GET DETAILS OF ANY USER
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError(`User does not exist with this id:${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

// ADMIN ROLE - UPDATE USER DETAILS OF ANY USER BY ADMIN
exports.updateUserRole = catchAsync(async (req, res, next) => {
  if (req.user.id === req.params.id && req.body.role === "user") {
    return next(
      new AppError("An Admin cannot change its own role to user", 400)
    );
  }

  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(
      new AppError(`User does not exist with this id:${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
  });
});

// ADMIN ROLE - DELETE USER BY ADMIN
exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next(
      new AppError("An admin cannot delete its own user profile", 400)
    );
  }
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    return next(
      new AppError(`User does not exist with this id:${req.params.id}`, 404)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  res.status(200).json({
    status: "success",
    message: "user deleted successfully",
  });
});
