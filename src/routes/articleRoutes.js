const express = require("express");

const {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
} = require(
  "../controllers/articleController"
);

const protect = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

/**
 * @route POST /api/articles
 * @desc Create article
 * @access Private
 */
router.post(
  "/",
  protect,
  createArticle
);

/**
 * @route GET /api/articles
 * @desc Get all articles
 * @access Public
 */
router.get(
  "/",
  getArticles
);

/**
 * @route GET /api/articles/:slug
 * @desc Get single article
 * @access Public
 */
router.get(
  "/:slug",
  getSingleArticle
);

/**
 * @route PUT /api/articles/:slug
 * @desc Update article
 * @access Private
 */
router.put(
  "/:slug",
  protect,
  updateArticle
);

/**
 * @route DELETE /api/articles/:slug
 * @desc Delete article
 * @access Private
 */
router.delete(
  "/:slug",
  protect,
  deleteArticle
);

module.exports = router;