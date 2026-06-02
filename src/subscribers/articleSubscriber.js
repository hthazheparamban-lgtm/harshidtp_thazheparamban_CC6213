const redis = require("redis");

const subscriber = redis.createClient({
  url: process.env.REDIS_URL
});

(async () => {

  await subscriber.connect();

  await subscriber.subscribe(
    "article-created",

    (message) => {

      const event =
        JSON.parse(message);

      console.log(
        "ARTICLE CREATED EVENT:"
      );

      console.log(event);
    }
  );
})();