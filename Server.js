
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var config = require('config');



// Routes Configurations
//var apiRoutes = require('./codeBehindRoutes');
// Middleware set to to use bodyParser, uses url Encoder, then every data type will be included for parsing
app.use(bodyParser.urlencoded({ extended: true }));
// converts to json object
app.use(bodyParser.json());

//app.use(express.static('app'));
app.use(express.static('app2'));



// Registering Routes Configuration
// ===========================================
//app.use('/server', apiRoutes);
app.listen(config.webserver.port);
console.log("***Server Started***");
console.log("Environment            : "+ process.env.NODE_ENV);
console.log("Server Started on Port : "+config.webserver.port);

