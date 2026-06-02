const { validationResult } = require("express-validator");

/**
 * Validation middleware
 * 
 * Checks validation results from
 * express-validator rules.
 */
const validate = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  // Continue to next middleware/controller
  next();
};

module.exports = validate;