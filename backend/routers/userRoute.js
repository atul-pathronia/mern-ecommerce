const express = require("express");
const authController = require("../controllers/authController");
const authentication = require("../middleware/authentication");

const router = express.Router();

// NO AUTHENTICATION REQUIRED
router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/password/forgot").post(authController.forgetPassword);
router.route("/password/reset/:token").put(authController.resetPassword);
router.route("/logout").get(authController.logoutUser);

// USER AUTHENTICATION TO ACCESS BELOW ROUTES
router.use(authentication.isAuthenticated);
router.route("/me").get(authController.getUserDetails);
router.route("/password/updatePassword").put(authController.updateUserPassword);
router.route("/me/updateMe").put(authController.updateProfile);

// ADMIN AUTHENTICATION TO ACCESS BELOW ROUTES
router.use(
  authentication.isAuthenticated,
  authentication.authorizedRole("admin")
);
router.route("/admin/users").get(authController.getAllUsers);
router
  .route("/admin/user/:id")
  .get(authController.getSingleUser)
  .put(authController.updateUserRole)
  .delete(authController.deleteUser);

module.exports = router;
