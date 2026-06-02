const redis = require("redis");

const publisher = redis.createClient({
  url: process.env.REDIS_URL
});

(async () => {
  await publisher.connect();
})();

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