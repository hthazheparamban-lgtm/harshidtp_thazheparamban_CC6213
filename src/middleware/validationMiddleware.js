const { validationResult } = require("express-validator");

/**
 * Validation middleware
 * 
 * Checks request validation results
 * and returns errors if validation fails.
 */
const validate = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};

module.exports = validate;