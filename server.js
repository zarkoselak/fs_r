"use strict";

var express 	= require('express');
var bodyParser 	= require('body-parser');

var router      = require('./routes/router.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port 	= process.env.PORT || 8585;

app.use('/bookings', router.api);
app.use('/', router.web);

app.listen(port);
