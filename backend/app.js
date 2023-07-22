const express = require("express");
const productRouter = require("../backend/routers/productRoute");
const userRouter = require("../backend/routers/userRoute");
const reviewRouter = require("../backend/routers/reviewRoute");
const paymentRouter = require("../backend/routers/paymentRoute");
const orderRouter = require("../backend/routers/orderRoute");
const globalErrorHandler = require("../backend/middleware/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);

app.use(globalErrorHandler);

module.exports = app;
