'use strict';

var express	 = require('express');
var api 	   = express.Router();
var jwt      = require('jsonwebtoken');
var config   = require('../../config.js');

var Booking  = require('../../db/models/booking.js');
var User     = require('../../db/models/user.js');

api.use(function(req, res, next){
  console.log('prossessing!');
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      console.log(decoded, req.decoded);
      if(err) {
        return res.json({ success: false, message: 'Faild to authenticate token!' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token'
    });
  }
});

api.route('/')
	.get(function(req, res) {
    res.json({ message: 'FSR API!' });
	});

api.route('/users')
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err)
        res.send(err);

      res.json(users);
    });
  })
  .post(function(req, res) {
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      nick: req.body.nick,
      password: req.body.password,
      super_admin: req.body.super_admin,
      user_lvl: req.body.user_lvl
    });

    user.save(function(err) {
      if(err)
        res.send(err);

      res.json({ message: 'User created' });
    });
  });

api.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err)
        res.send(err);

      res.json(user);
    });
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
        if(err)
          res.send(err);

        res.json({ message: 'User deleted!'});
    });
  });

api.route('/bookings')
	.get(function(req, res) {
		Booking.find(function(err, bookings) {
      if(err)
        res.send(err);

      res.json(bookings);
    });
	})
	.post(function(req, res) {
    var booking = new Booking({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date: req.body.date,
      user_id: req.body.user_id
    });

    booking.save(function(err) {
      if(err)
        res.send(err);

      res.json({ message: 'Booking created' });
    });

	});

api.route('/bookings/:booking_id')
	.get(function(req, res) {
    Booking.findById(req.params.booking_id, function(err, booking) {
      if(err)
        res.send(err);

      res.json(booking);
    });
	})

	.put(function(req, res) {

    Booking.findById(req.params.booking_id, function(err, booking) {

      if(err)
        res.send(err);

      //Update all fiels on model
      for(var field in Booking.schema.paths) {
        if((field !== '_id') && (field !== '__v')) {
          if(req.body[field] !== undefined) {
            booking[field] = req.body[field];
          }
        }
      }

      booking.save(function(err) {
        if(err)
          res.send(err);

        res.json({ message: 'booking updated' });
      });
    });
	})

	.delete(function(req, res) {
    Booking.remove({
      _id: req.params.booking_id
    }, function(err, booking) {
        if(err)
          res.send(err);

        res.json({ message: 'Booking deleted!'});
    });
	});

module.exports = api;

