const express = require("express");
const authentication = require("../middleware/authentication");
const orderController = require("../controllers/orderController");

const router = express.Router();

// USER AUTHENTICATION IS REQUIRED TO ACCESS THREE ROUTES
router.use(authentication.isAuthenticated);
router.route("/new").post(orderController.newOrder);
router.route("/:id").get(orderController.getSingleOrder);
router.route("/account/me").get(orderController.myOrders);

// USER AUTHENTICATION AND REQUIRED ROLE ADMIN IS REQUIRED TO ACCESS ROUTES
router.use(
  authentication.isAuthenticated,
  authentication.authorizedRole("admin")
);
router.route("/admin/orders").get(orderController.getAllOrders);
router
  .route("/admin/order/:id")
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
