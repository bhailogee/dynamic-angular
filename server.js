
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var config = require('config');

// port to listen
var port = config.Server.http.port;

// Routes Configurations
var apiRoutes = require('./routes');


// Middleware set to to use bodyParser, uses url Encoder, then every data type will be included for parsing
app.use(bodyParser.urlencoded({ extended: true }));
// converts to json object
app.use(bodyParser.json());

app.use(express.static('app'));



// Registering Routes Configuration
// ===========================================

app.use('/server', apiRoutes);

app.listen(port);

console.log("Server Started");