const redis = require("redis");

// Create Redis publisher client
const publisher = redis.createClient({
  url: process.env.REDIS_URL
});

// Connect to Redis server
(async () => {
  await publisher.connect();
})();

// Publish article creation event
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