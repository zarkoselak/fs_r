'use strict';

var express	 = require('express');
var web 	   = express.Router();

web.route('/')
  .get(function(req, res) {
    res.render('index');
  });

web.route('/dashboard')
  .get(function(req, res) {
    res.render('index');
    //res.json({ message: 'login screen' });
  })
  .post(function(req, res) {
    res.json({ message: 'trigger login' });
  });

module.exports = web;
