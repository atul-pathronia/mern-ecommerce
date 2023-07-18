const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProductsAdmin,
} = require("../controllers/productController");
const authentication = require("../middleware/authentication");
// const reviewController = require("../controllers/reviewController");
const reviewRouter = require("../routers/reviewRoute");

const router = express.Router();

// AUTHENTICATION NOT REQUIRED
router.use("/:productId/reviews", reviewRouter);
router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);

// ADMIN AUTHENTICATION IS REQUIRED TO ACCESS BELOW ROUTES
router.use(
  authentication.isAuthenticated,
  authentication.authorizedRole("admin")
);
router.route("/admin/products").get(getAllProductsAdmin);
router.route("/admin/product/new").post(createProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
