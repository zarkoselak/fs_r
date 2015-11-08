'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var BookingSchema = new Schema({
  first_name: String,
  last_name: String,
  date: Number,
  user_id: Number
});

module.exports = mongoose.model('Booking', BookingSchema);
