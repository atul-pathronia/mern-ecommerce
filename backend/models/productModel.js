const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please set product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please set product description"],
    },
    price: {
      type: Number,
      required: [true, " Please set product price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please set product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please set product stock"],
      // maxLength: [4, "Stock cannot exceed 4 characters"],
      min: [1, "Minimum one stock is required"],
      max: [9999, "Maximum 9999 stock can be set"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// UNIQUE PRODUCT NAME
productSchema.index({ name: 1 }, { unique: true });

// virtual populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
