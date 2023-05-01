const Redis = require("redis");

const redisClient = Redis.createClient({
  url: "redis://redis:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis server");
});

redisClient.on("error", (err) => {
  console.error("Redis server error", err);
});

redisClient.connect();

module.exports = redisClient;
