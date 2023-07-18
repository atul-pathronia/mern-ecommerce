const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "A review cannot be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to  a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// EACH REVIEW IS DONE BY ONE USER ON ONE PRODUCT
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name avatar,",
  });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const averageRating = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (averageRating.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: averageRating[0].avgRating,
      numOfReviews: averageRating[0].nRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 4.5,
      numOfReviews: 1,
    });
  }
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.product);
});

// Persisting review update and delete on product model
// findByIdAndUpdate
// findByIdAndDelete

// reviewSchema.pre(/^findOneAnd/, async function (next) {
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne().clone();
  next();
});

reviewSchema.post(/^findOne/, async function () {
  console.log(this.review && this.review.review);

  if (this.review) {
    await this.model.calcAverageRatings(this.review.product);
  }
  console.log("post query");
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
