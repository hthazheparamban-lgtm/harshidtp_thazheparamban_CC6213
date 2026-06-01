const jwt = require("jsonwebtoken");

/**
 * Generate JWT authentication token
 * 
 * Creates a signed JSON Web Token containing
 * the authenticated user's MongoDB ID.
 * 
 * The token is used to:
 * - authenticate protected routes
 * - identify logged-in users
 * - maintain stateless authentication
 * 
 * Token expiration is set to 7 days
 * for improved security.
 */
const generateToken = (id) => {

  return jwt.sign(

    // Payload data stored inside token
    { id },

    // Secret key used for token signing
    process.env.JWT_SECRET,

    // Token configuration options
    {
      expiresIn: "7d"
    }
  );
};

// Export token generator utility
module.exports = generateToken;