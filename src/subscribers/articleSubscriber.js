const redis = require("redis");

// Create Redis subscriber client
const subscriber = redis.createClient({
  url: process.env.REDIS_URL
});

(async () => {

  // Connect to Redis server
  await subscriber.connect();

  // Subscribe to article creation events
  await subscriber.subscribe(
    "article-created",

    (message) => {

      // Parse event payload
      const event =
        JSON.parse(message);

      // Log received event
      console.log(
        "ARTICLE CREATED EVENT:"
      );

      console.log(event);
    }
  );
})();