const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect private routes using JWT authentication
const protect = async (req, res, next) => {
  try {

    let token;

    // Check for Bearer token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode JWT token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Retrieve authenticated user
      req.user = await User.findById(
        decoded.id
      ).select("-password");

      // Continue to next middleware
      return next();
    }

    // Reject unauthenticated requests
    return res.status(401).json({
      success: false,
      message: "Not authorized"
    });

  } catch (error) {

    // Handle invalid or expired tokens
    return res.status(401).json({
      success: false,
      message: "Token failed"
    });
  }
};

module.exports = protect;