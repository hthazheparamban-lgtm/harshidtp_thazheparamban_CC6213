const redis = require("redis");

// Create Redis client

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// Redis connection success
 
redisClient.on("connect", () => {
  console.log("Redis Connected");
});

// Redis connection error handling

redisClient.on("error", (error) => {
  console.error("Redis Error:", error);
});

// Connect Redis client

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;