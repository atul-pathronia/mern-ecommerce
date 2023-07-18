const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const { isAuthenticated } = require("../middleware/authentication");
const router = express.Router();

// USER AUTHENTICATION IS REQUIRED TO ACCESS ROUTES
router.use(isAuthenticated);
router.route("/process").post(processPayment);
router.route("/sendStripeaApiKey").get(sendStripeApiKey);

module.exports = router;
