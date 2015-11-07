'use strict';

var express	= require('express');
var api 	= express.Router();

api.route('/')
	.get(function(req, res) {
		res.json({ message: 'fs_r API!'});
	});

api.route('/bookings')
	.get(function(req, res) {
		res.json({ message: 'all bookings' });
	})
	.post(function(req, res) {
		//create booking object
		res.json({ message: 'booking created'});
	});

api.route('/bookings/:booking_id')
	.get(function(res, req) {
		//find booking by id
		res.json({ message: 'booking' });
	})
	.put(function(res, req) {
		// find booking, edit booking and save model
		res.json({ message: 'edit booking' });
	})
	.delete(function(req, res) {
		//find booking by id and delete
		res.josn({ message: 'delete booking' });
	})

module.exports = api;

