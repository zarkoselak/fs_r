'use strict';

var express	= require('express');

var api  	= require('./api/api.js');
var web 	= require('./app/index.js');

var router = {
	web: web,
	api: api
};

module.exports = router;
