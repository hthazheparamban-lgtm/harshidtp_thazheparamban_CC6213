const Comment = require("../models/Comment");
const Article = require("../models/Article");

/**
 * Add comment to article
 */
const addComment = async (req, res) => {

  try {

    const article = await Article.findOne({
      slug: req.params.slug
    });

    if (!article) {

      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    const comment = await Comment.create({

      body: req.body.body,

      author: req.user._id,

      article: article._id
    });

    return res.status(201).json({
      success: true,
      comment
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get article comments
 */
const getComments = async (req, res) => {

  try {

    const article = await Article.findOne({
      slug: req.params.slug
    });

    if (!article) {

      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    const comments = await Comment.find({
      article: article._id
    }).populate(
      "author",
      "username email"
    );

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete comment
 */
const deleteComment = async (req, res) => {

  try {

    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {

      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    /**
     * Ownership check
     */
    if (
      comment.author.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await comment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Comment deleted"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment
};