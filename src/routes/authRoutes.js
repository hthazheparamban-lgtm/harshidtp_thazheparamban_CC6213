const express = require("express");

/**
 * Import authentication controller methods
 */
const {
  registerUser,
  loginUser,
  getCurrentUser
} = require("../controllers/authController");

/**
 * Import authentication middleware
 */
const protect = require("../middleware/authMiddleware");

/**
 * Import validation middleware
 */
const validate = require(
  "../middleware/validationMiddleware"
);

/**
 * Import request validators
 */
const {
  registerValidation,
  loginValidation
} = require("../validators/authValidators");

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

/**
 * @route POST /api/auth/login
 * @desc Login existing user
 * @access Public
 */
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

/**
 * @route GET /api/auth/me
 * @desc Get current authenticated user
 * @access Private
 */
router.get(
  "/me",
  protect,
  getCurrentUser
);

module.exports = router;