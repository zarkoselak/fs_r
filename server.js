"use strict";

var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var exphbs      = require('express-handlebars');
var mongoose    = require('mongoose');

var router  = require('./routes/router.js');
var app     = express();

mongoose.connect('mongodb://localhost/fsrdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port 	= process.env.PORT || 8585;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/api', router.api);
app.use('/', router.web);

app.listen(port);
