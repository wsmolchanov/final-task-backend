var express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

var app = express();

const db = mongoose.createConnection('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.on('error', function (err) {
  if (err) {
    console.log('MainDB');
    console.log(err);
  }
});
db.once('open', function callback () {
  console.info('CLIENT DB connected successfully');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(config.PORT, function () {
  console.log(`Example app listening on port ${config.PORT}!`);
});