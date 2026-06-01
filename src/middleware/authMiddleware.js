const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Authentication middleware
 * 
 * Protects private routes by verifying JWT tokens.
 * 
 * Workflow:
 * - Extract token from Authorization header
 * - Verify token authenticity
 * - Decode user ID from token payload
 * - Retrieve authenticated user from database
 * - Attach user object to request
 */
const protect = async (req, res, next) => {
  try {

    let token;

    // Check if Authorization header exists
    // and starts with Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      // Extract JWT token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode JWT token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Find authenticated user in database
      // Exclude password field for security
      req.user = await User.findById(decoded.id)
        .select("-password");

      // Continue to next middleware/controller
      return next();
    }

    // Reject requests without valid token
    return res.status(401).json({
      success: false,
      message: "Not authorized"
    });

  } catch (error) {

    // Handle invalid or expired token errors
    return res.status(401).json({
      success: false,
      message: "Token failed"
    });
  }
};

module.exports = protect;