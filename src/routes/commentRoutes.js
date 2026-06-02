const express = require("express");

const {
  addComment,
  getComments,
  deleteComment
} = require(
  "../controllers/commentController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

/**
 * Add comment
 */
router.post(
  "/:slug/comments",
  protect,
  addComment
);

/**
 * Get article comments
 */
router.get(
  "/:slug/comments",
  getComments
);

/**
 * Delete comment
 */
router.delete(
  "/comments/:id",
  protect,
  deleteComment
);

module.exports = router;