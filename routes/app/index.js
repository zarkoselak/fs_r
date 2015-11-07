'use strict';

var express	= require('express');
var web 	= express.Router();

web.route('/')
  .get(function(req, res) {
    res.json({ message: 'web'});
  });

web.route('/dashboard')
  .get(function(req, res) {
    res.json({ message: 'login screen' });
  })
  .post(function(req, res) {
    res.json({ message: 'trigger login' });
  });

module.exports = web;
