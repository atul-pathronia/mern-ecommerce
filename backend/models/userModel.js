const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [4, "Name should be greater then 4 letters"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater then 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
  resetPasswordToken: String,
  resetPassowrdExpired: Date,
});

// PASSSWORD ENCRYPTION BEFORE SAVE IN DATABASE WHITE REGISTER USER
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// SIGNING NEW JWT TOKEN
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

// TO CHECK IF LOGIN PASSWORD IS EQUAL TO ENCRYPTED PASSWORD SAVED IN DATABASE
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// PASSWORD RESET TOKEN AND ENCRYPT NEW PASSWORD BEFORE SAVE INTO DATABASE
userSchema.methods.getUserPasswordToken = function () {
  // Create randon bytes
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // setting reset token expiration time
  this.resetPassowrdExpired = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
