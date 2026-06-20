const mongoose = require("mongoose");

// Comment schema
const commentSchema = new mongoose.Schema(
  {

    body: {
      type: String,
      required: true,
      trim: true
    },

    // Reference to comment author
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Reference to related article
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);