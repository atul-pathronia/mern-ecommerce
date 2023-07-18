const Product = require("../models/productModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const ApiFeatures = require("../../utils/apiFeatures");
const cloudinary = require("cloudinary");

// ADMIN ROLE - CREATE NEW PRODUCT FORM ADMIN DASHBOAR
exports.createProduct = catchAsync(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images.flat(Infinity);
  }

  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

// SEND ALL PRODUCTS TO FRONTEND WITH FILTER IF APPLIED
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const resultPerPage = 12;
  const productsCount = await Product.countDocuments();

  const filterProducts = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await filterProducts.query;

  let filteredProductsCount = products.length;

  filterProducts.paginate(resultPerPage);

  products = await filterProducts.query.clone();

  res.status(201).json({
    status: "success",
    count: products.length,
    data: {
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    },
  });
});

// ADMIN ROLE - LOOKUP ALL PRODUCT OF STORE FORM ADMIN DASHBOARD
exports.getAllProductsAdmin = catchAsync(async (req, res, next) => {
  const products = await Product.find({});

  res.status(201).json({
    status: "success",
    count: products.length,
    data: {
      products,
    },
  });
});

// ADMIN ROLE - EDIT AMY PRODUCT OF STORE FORM ADMIN DASHBOARD
exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// ADMIN ROLE - DELETE ANY PRODUCT OF STORE FORM ADMIN DASHBOARD
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Deleting image from cloudinary

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Product deleted",
  });
});

// SEND PRODUCT DETAILS OF EACH PRODUCT TO FRONTEND
exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
