const redis = require("redis")

const redisclient = redis.createClient({
  url: 'redis://db_redis_example:6379'
});

module.exports = redisclient