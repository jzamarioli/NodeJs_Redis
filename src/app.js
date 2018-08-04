const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRoute = require('./routes/index-route');
const authRoute = require('./routes/auth-route');
const itemRoute = require('./routes/item-route');

const app = express();

// view engine setup
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Limit the size of body request
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/authenticate', authRoute);
app.use('/item', itemRoute);

module.exports = app;
