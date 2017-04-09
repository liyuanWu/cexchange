var redis = require("redis");

var redisClient = redis.createClient();


redisClient.hset('category', 'NaOH', JSON.stringify({
  metas: {
    Brand: "TianGong",
    Price: "3000/ton",
    Count: '999 ton',
    Location: 'Beijing'
  },
  content: 'you can serialize your complex objects and store them as strings. We suggest json or msgpack for the serialization format. This is easy enough to manipulate from most client-side languages. If server-side access is needed, then a server-side Lua script can easily encode/decode such objects since Redis is compiled with msgpack and json support for Lua.'
}))


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