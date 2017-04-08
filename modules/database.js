var redis = require("redis");

var redisClient = redis.createClient();

// CONNECTION EVENTS
// When successfully connected
redisClient.on('connected', function () {
  console.log('redisClient default connection open');
});

// If the connection throws an error
redisClient.on('error',function (err) {
  console.error('redisClient default connection error: ' + err);
});

// When the connection is disconnected
redisClient.on('disconnected', function () {
  console.log('redisClient default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  console.log('redisClient default connection disconnected through app termination');
  redisClient.quit();
  process.exit();
});

module.exports = redisClient;