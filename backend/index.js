'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const redis = require('./redis-util');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// create application/json parser
const jsonParser = bodyParser.json();

// App
const app = express();

app.get('/api/getall',  (req, res) => {
    redis.get_all_users((reply) => {
      res.send({'message': `${reply}`});
    });
});

app.post('/api/addUser', jsonParser, (req, res) => {
  let reply = redis.add_user(req.body.name);
  if (reply) {
    res.send({'message': `User ${req.body.name} added`});
  } else {
    res.send({'message': `Adding user ${req.body.name} failed`});
  }
});

app.put('/api/deleteAll', (req, res) => {
  redis.delete_all_users(res);
});

app.listen(3000, function(){
    console.log('Listening on 3000');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
