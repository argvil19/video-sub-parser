const kue = require('kue')
const queue = kue.createQueue({
    redis: {
      port: 6379,
      host: 'redis',
      password: process.env.REDIS_PASSWORD
    }
});

module.exports = queue;
