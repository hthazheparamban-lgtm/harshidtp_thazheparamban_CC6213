const mongoose = require("mongoose");

/**
 * User schema definition
 * 
 * Represents application users and stores:
 * - authentication credentials
 * - profile information
 * - social following relationships
 * 
 * Mongoose schema validation ensures
 * consistent and secure user data.
 */
const userSchema = new mongoose.Schema(
  {

    /**
     * Unique username for user identification
     */
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    /**
     * User email address
     * Stored in lowercase to avoid duplicates
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    /**
     * Securely hashed user password
     */
    password: {
      type: String,
      required: true,
      minlength: 6
    },

    /**
     * Optional user biography/profile description
     */
    bio: {
      type: String,
      default: ""
    },

    /**
     * Optional profile image URL
     */
    image: {
      type: String,
      default: ""
    },

    /**
     * Array of users following this account
     * Stores MongoDB ObjectId references
     */
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    /**
     * Array of users this account follows
     * Creates social relationship mapping
     */
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },

  /**
   * Automatically adds:
   * - createdAt
   * - updatedAt
   */
  {
    timestamps: true
  }
);

// Export User model
module.exports = mongoose.model("User", userSchema);