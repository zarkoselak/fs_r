'use strict';

var express	= require('express');
var api 	= express.Router();

var Booking = require('../../db/models/booking.js');

api.use(function(req, res, next){
  console.log('prossessing!');
  next();
});

api.route('/')
	.get(function(req, res) {
    res.json({ message: 'FSR API!' });
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
      first_name: req.body.first,
      last_name: req.body.last,
      date: req.body.date,
      user_id: req.body.user
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

      booking.last_name = req.body.last;

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

