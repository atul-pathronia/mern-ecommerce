const Product = require("../models/productModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const Order = require("../models/orderModel");

// NEW ORDER BY USER
exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

// ORDER DETAILS LOOKUP BY USER
exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new AppError("Order not found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// ALL ORDERS OF EACH USER
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

// ADMIN ROLE - ALL ORDERS OF STORE
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({});

  let totalAmount = 0;

  orders.reduce((prev, curr, index, array) => {
    totalAmount += curr.totalPrice;
  }, totalAmount);

  res.status(200).json({
    status: "success",
    totalAmount,
    orders,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// ADMIN ROLE - UPDATE ORDER STATUS OF ANY ORDER
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("order not found", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

// ADMIN ROLE - DELETE ANY ORDER FROM STORE
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError("order not found", 404));
  }

  await Order.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Order deleted",
  });
});
