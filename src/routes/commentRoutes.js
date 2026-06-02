const express = require("express");

// Import comment controller methods
const {
  addComment,
  getComments,
  deleteComment
} = require(
  "../controllers/commentController"
);

// Import authentication middleware
const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

// Add comment to article
router.post(
  "/:slug/comments",
  protect,
  addComment
);

// Get article comments
router.get(
  "/:slug/comments",
  getComments
);

// Delete comment
router.delete(
  "/comments/:id",
  protect,
  deleteComment
);

module.exports = router;