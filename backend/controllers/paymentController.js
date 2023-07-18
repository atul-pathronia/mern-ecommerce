const dotenv = require("dotenv");
const catchAsync = require("../../utils/catchAsync");

dotenv.config({ path: "backend/config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// PROCESSING ORDER PAYMENT OF  USER
exports.processPayment = catchAsync(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    status: "success",
    client_secret: myPayment.client_secret,
  });
});

// STRIPE KEY SENT TO FRONTEND - REQUIRED FOR PAYMENT
exports.sendStripeApiKey = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
