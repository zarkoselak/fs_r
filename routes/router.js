'use strict';

var express	= require('express');

var api  	= require('./api/api.js');
var web 	= require('./app/index.js');

web.route('/')
	.get(function(req, res) {
		res.json({ message: 'web' });
	});

var router = {
	web: web,
	api: api
};

module.exports = router;
