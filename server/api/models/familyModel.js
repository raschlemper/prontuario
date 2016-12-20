'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var FamilySchema = new Schema({
	name: String, 
  age: Number, 
  schooling: Number, 
  maritalStatus: Number,
  occupation: String,
  type: String 
});

module.exports = FamilySchema;
// module.exports = mongoose.model('Family', FamilySchema);
