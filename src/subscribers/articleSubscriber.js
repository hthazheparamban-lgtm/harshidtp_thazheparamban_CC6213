const redis = require("redis");

/**
 * Redis subscriber client
 *
 * Listens for application events published
 * through Redis Pub/Sub channels.
 */
const subscriber = redis.createClient({
  url: process.env.REDIS_URL
});

(async () => {

  /**
   * Connect subscriber to Redis server.
   */
  await subscriber.connect();

  /**
   * Subscribe to article creation events.
   *
   * Whenever a new article is created,
   * the publisher sends an event to the
   * "article-created" channel.
   *
   * This subscriber receives the event
   * asynchronously and processes the payload.
   */
  await subscriber.subscribe(
    "article-created",

    (message) => {

      /**
       * Convert JSON string payload
       * back into a JavaScript object.
       */
      const event =
        JSON.parse(message);

      /**
       * Log event details for monitoring
       * and verification purposes.
       */
      console.log(
        "ARTICLE CREATED EVENT:"
      );

      console.log(event);
    }
  );
})();