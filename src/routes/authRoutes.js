const express = require("express");

// Import authentication controller methods
const {
  registerUser,
  loginUser,
  getCurrentUser
} = require("../controllers/authController");

// Import authentication middleware
const protect = require(
  "../middleware/authMiddleware"
);

// Import validation middleware
const validate = require(
  "../middleware/validationMiddleware"
);

// Import request validators
const {
  registerValidation,
  loginValidation
} = require(
  "../validators/authValidators"
);

const router = express.Router();

// Register new user
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

// Login existing user
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

// Get current authenticated user
router.get(
  "/me",
  protect,
  getCurrentUser
);

module.exports = router;