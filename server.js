var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwtGenerator = require('jsonwebtoken');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');

// APP CONFIGURATION
// =================

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-AllowMethods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/assets/img/table-tome-logo.png'));

mongoose.connect(process.env.MONGOLAB_URI);

// AUTHENTICATION
// --------------
var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

// AUTH0 MANAGEMENT
// ----------------
var ManagementClient = require('auth0').ManagementClient;
var auth0Manager = new ManagementClient({
  token: process.env.AUTH0_API_TOKEN,
  domain: process.env.AUTH0_DOMAIN
});

// ROUTES
// ======

// API ROUTES
// ----------

var api = require('./app/routes/api')(app, express, authenticate, auth0Manager);
app.use('/api', api);

// MAIN CATCHALL
// -------------

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER
// ============

app.listen(app.get('port'), function() {
  console.log('TableTome is running on port', app.get('port'));
});
