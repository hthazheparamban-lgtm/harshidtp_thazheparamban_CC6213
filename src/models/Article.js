const mongoose = require("mongoose");
const slugify = require("slugify");

// Article schema
const articleSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    body: {
      type: String,
      required: true
    },

    tags: [
      {
        type: String
      }
    ],

    // Reference to article author
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Generate article slug before saving
articleSchema.pre("save", function () {

  if (!this.slug) {

    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    });
  }
});

module.exports = mongoose.model(
  "Article",
  articleSchema
);