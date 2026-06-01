const Article = require("../models/Article");
const redisClient = require("../config/redis");
/**
 * Create new article
 */
const createArticle = async (req, res) => {

  try {

    const {
      title,
      description,
      body,
      tags
    } = req.body;

    const article = await Article.create({

      title,
      description,
      body,
      tags,

      // Attach logged-in user as author
      author: req.user._id
    });

    return res.status(201).json({
      success: true,
      article
    });

  }  catch (error) {

  console.log(error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
}
};
/**
 * Get all articles
 */
const getArticles = async (req, res) => {

  try {

    /**
     * Check Redis cache first
     */
    const cachedArticles =
      await redisClient.get("articles");

    if (cachedArticles) {

      return res.status(200).json({
        success: true,
        source: "redis-cache",
        articles: JSON.parse(cachedArticles)
      });
    }

    /**
     * Fetch from MongoDB
     */
    const articles = await Article.find()
      .populate("author", "username email");

    /**
     * Store articles in Redis cache
     */
    await redisClient.set(
      "articles",
      JSON.stringify(articles),
      {
        EX: 60
      }
    );

    return res.status(200).json({
      success: true,
      source: "mongodb",
      count: articles.length,
      articles
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single article by slug
 */
const getSingleArticle = async (req, res) => {

  try {

    const article = await Article.findOne({
      slug: req.params.slug
    }).populate("author", "username email");

    if (!article) {

      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }
/**
 * Clear cached article list
 */
await redisClient.del("articles");
    return res.status(200).json({
      success: true,
      article
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/**
 * Update article
 */
const updateArticle = async (req, res) => {

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

    /**
     * Ownership check
     */
    if (
      article.author.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    const updatedArticle =
      await Article.findByIdAndUpdate(

        article._id,

        req.body,

        {
          new: true,
          runValidators: true
        }
      );

    return res.status(200).json({
      success: true,
      article: updatedArticle
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/**
 * Delete article
 */
const deleteArticle = async (req, res) => {

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

    /**
     * Ownership check
     */
    if (
      article.author.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await article.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Article deleted"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
};