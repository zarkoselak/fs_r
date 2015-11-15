'use strict';

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
  first_name: String,
  last_name: String,
  nick: String,
  password: String,
  super_admin: Boolean,
  user_lvl: Number
});

module.exports = mongoose.model('User', UserSchema);
