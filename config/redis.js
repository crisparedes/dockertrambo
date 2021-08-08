//REDIS
const redis = require('redis');
const client = redis.createClient( {port:6379, host:process.env.REDIS_HOST});

module.exports=client;
