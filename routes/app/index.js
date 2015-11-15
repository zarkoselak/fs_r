'use strict';

var express	 = require('express');
var web 	   = express.Router();
var config   = require('../../config.js');
var User     = require('../../db/models/user.js');
var jwt      = require('jsonwebtoken');

web.route('/')
  .get(function(req, res) {
    res.render('index');
  });

web.route('/login')
  .get(function(req, res) {
    res.render('login');
  })
  .post(function(req, res) {
    User.findOne({ nick: req.body.nick }, function(err, user) {
      if(err)
        throw err;

      if(!user) {

        res.json({ success: false, message: 'User not found.' });

      } else if(user) {
        if(user.password !== req.body.password) {

          res.json({ success: false, message: 'Wrong password.' });

        } else {

          var token = jwt.sign({ user: user.nick }, config.secret, { expiresIn: 120 });
          console.log('user', user.nick, 'token :', token);
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  })

web.route('/dashboard')
  .get(function(req, res) {
    res.render('dashboard');
    //res.json({ message: 'login screen' });
  });

module.exports = web;
