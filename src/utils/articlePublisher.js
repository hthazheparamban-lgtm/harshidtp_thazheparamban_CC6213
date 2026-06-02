const redis = require("redis");

/**
 * Redis publisher client
 *
 * Responsible for publishing application events
 * to Redis Pub/Sub channels.
 */
const publisher = redis.createClient({
  url: process.env.REDIS_URL
});

/**
 * Establish Redis connection when the application starts.
 */
(async () => {
  await publisher.connect();
})();

/**
 * Publish article creation event.
 *
 * Triggered whenever a new article is successfully created.
 * The event is sent to the "article-created" channel
 * where subscribers can process it asynchronously.
 *
 * @param {Object} article - Newly created article document
 */
const publishArticleCreated = async (article) => {

  await publisher.publish(
    "article-created",

    JSON.stringify({
      title: article.title,
      slug: article.slug,
      author: article.author,
      createdAt: article.createdAt
    })
  );
};

module.exports = {
  publishArticleCreated
};