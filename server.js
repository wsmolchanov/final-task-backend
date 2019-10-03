var express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const modelsPath		= __dirname + '/models/';


var app = express();
app.use(cors());
app.use(bodyParser.json({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});


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
db.once('open', function callback() {
  console.info('CLIENT DB connected successfully');
});
module.exports = {
  main: db
};


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(require('./_helpers/jwt.middlerware').jwtCheck);

// ROUTES
require('./routes/auth.route')(app);

app.use(require('./_helpers/error-handler').handleError);

app.listen(config.PORT, function () {
  console.log(`Example app listening on port ${config.PORT}!`);
});