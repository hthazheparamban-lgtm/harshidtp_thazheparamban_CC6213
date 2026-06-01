const mongoose = require("mongoose");

/**
 * Comment schema
 * 
 * Stores comments linked to articles and users.
 */
const commentSchema = new mongoose.Schema(
  {

    body: {
      type: String,
      required: true,
      trim: true
    },

    /**
     * Comment author
     */
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    /**
     * Related article
     */
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