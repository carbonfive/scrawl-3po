'use strict';

var verifyRequestSignature = require('./app/models/verify')

const 
  bodyParser = require('body-parser'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),  
  request = require('request'),
  router = require('./app/router');
const APP_SECRET = require('./app/models/authSetUp').APP_SECRET;

var app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));
app.use('/', router);

module.exports = app;
