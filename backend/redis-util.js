const redis = require('redis');

const user_key = 'User';
const client = redis.createClient({
    port: 6379,
    host: 'redis-service',
    password: process.env.REDIS_PASSWORD
  });

client.on('connect', function() {
    console.log(`Connected to redis`);
});

function add_user(value, key='User') {
    return client.rpush([key, value], (err, reply) => {
        if (err) console.log(`Error adding user ${value}`);
    });
};

function get_all_users(callback){
    client.lrange(user_key, 0, -1, (err, reply) => {
        callback(reply);
    });
};

function delete_all_users(res){
    client.del(user_key);
    res.send({'message': 'All users deleted'});
};

module.exports = {add_user, get_all_users, delete_all_users}