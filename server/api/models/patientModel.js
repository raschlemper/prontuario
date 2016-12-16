'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");
// var deepPopulate = require('mongoose-deep-populate');

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var PhoneSchema = new Schema({
	number: String, 
	type: String
});

var PatientSchema = new Schema({
  name: String,
  birthDate: Date,
  age: Number,
  gender: Number,
  emails: [],
  phones: [ PhoneSchema ]
});

// PatientSchema.plugin(deepPopulate);
module.exports = mongoose.model('Patient', PatientSchema);
