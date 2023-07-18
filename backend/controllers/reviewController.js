const catchAsync = require("../../utils/catchAsync");
const Review = require("../models/reviewModel");

// GET AND SEND ALL REVIEWS ATTACHED TO EACH PRODUCT
exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.productId) filter = { product: req.params.productId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// GET AND SEND ALL REVIEWS ATTACHED TO EACH PRODUCT
exports.getAllReviewsOfSingleUser = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.user.id) filter = { user: req.user.id };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

// CREATE NEW REVIEW ON PURCHASED PRODUCT
exports.createReview = catchAsync(async (req, res, next) => {
  // Nested route
  if (!req.body.product) req.body.product = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  });
});

// REVIEW LOOKUP OF EACH REVIEW BY USER
exports.getSingleReview = catchAsync(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

//REVIEW UPDATE BY USER
exports.updateReview = catchAsync(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

// ADMIN ROLE - DELETE ANY REVIEW ACROSS THT STORE
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Review deleted",
  });
});
