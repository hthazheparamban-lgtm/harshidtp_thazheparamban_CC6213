const { body } = require("express-validator");

// Validation rules for user registration
const registerValidation = [

  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage(
      "Username must be at least 3 characters"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email is required"
    ),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters"
    )
];

// Validation rules for user login
const loginValidation = [

  body("email")
    .isEmail()
    .withMessage(
      "Valid email is required"
    ),

  body("password")
    .notEmpty()
    .withMessage(
      "Password is required"
    )
];

module.exports = {
  registerValidation,
  loginValidation
};