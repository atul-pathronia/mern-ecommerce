const express = require("express");
const reviewController = require("../controllers/reviewController");
const authentication = require("../middleware/authentication");

const router = express.Router({ mergeParams: true });

// NO AUTHENTICATION IS REQUIRED
router.route("/").get(reviewController.getAllReviews);

// USER AUTHENTICATION TO CREATE AND EDIT REVIEW
router.use(
  authentication.isAuthenticated,
  authentication.authorizedRole("user")
);
router.route("/me").get(reviewController.getAllReviewsOfSingleUser);
router.route("/me/:id").get(reviewController.getSingleReview);
router.route("/create").post(reviewController.createReview);
router.route("/edit/:id").patch(reviewController.updateReview);

// ADMIN AUTHENTICATION TO DELETE REVIEW
router.use(
  authentication.isAuthenticated,
  authentication.authorizedRole("admin")
);
router.route("/delete/:id").delete(reviewController.deleteReview);

module.exports = router;
