const mongoose = require("mongoose");

// User schema definition
const userSchema = new mongoose.Schema(
  {

    // Unique username for user identification
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    // User email address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    // Securely hashed user password
    password: {
      type: String,
      required: true,
      minlength: 6
    },

    // User biography
    bio: {
      type: String,
      default: ""
    },

    // User profile image URL
    image: {
      type: String,
      default: ""
    },

    // Users following this account
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // Users this account follows
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },

  // Add createdAt and updatedAt timestamps
  {
    timestamps: true
  }
);

// Export User model
module.exports = mongoose.model(
  "User",
  userSchema
);