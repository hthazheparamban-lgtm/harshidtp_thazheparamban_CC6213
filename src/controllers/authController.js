const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * Register a new user
 * 
 * - Checks if user already exists
 * - Hashes password securely using bcrypt
 * - Creates a new MongoDB user document
 * - Generates JWT authentication token
 */
const registerUser = async (req, res) => {
  try {

    // Extract user input from request body
    const { username, email, password } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Generate bcrypt salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash plain-text password securely
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user document in MongoDB
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Return authenticated response with JWT token
    return res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Authenticate existing user
 * 
 * - Verifies email exists
 * - Compares hashed password using bcrypt
 * - Returns JWT token upon successful login
 */
const loginUser = async (req, res) => {
  try {

    // Extract login credentials
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Reject invalid email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    // Reject incorrect password
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Return authenticated response with JWT token
    return res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/**
 * Get currently authenticated user
 */
const getCurrentUser = async (req, res) => {

  try {

    return res.status(200).json({
      success: true,
      user: req.user
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};