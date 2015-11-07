"use strict";

var express 	= require('express');
var bodyParser 	= require('body-parser');

var app = express(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port 	= process.env.PORT || 8585;
var router 	= express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'API!' });
});

app.use('/api', router);
app.listen(port);
