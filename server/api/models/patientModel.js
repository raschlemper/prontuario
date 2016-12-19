'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");
// var deepPopulate = require('mongoose-deep-populate');

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

// TODO: Criar um modal para cada schema

var PhoneSchema = new Schema({
	number: String, 
	type: String
});

var AddressSchema = new Schema({
	zipCode: Number,
	city: String,
	state: String,
	country: String,
	street: String,
	number: String,
	complement: String,
	district: String
});

var FamilySchema = new Schema({
	name: String, 
  age: Number, 
  schooling: Number, 
  maritalStatus: Number,
  occupation: String,
  type: String 
});

var PatientSchema = new Schema({
  name: String,
  birthDate: Date,
  age: Number,
  gender: Number,
  emails: [],
  phones: [ PhoneSchema ],
  address: [ AddressSchema ],
  family: {
  	father: FamilySchema,
  	mother: FamilySchema
  }
});

// PatientSchema.plugin(deepPopulate);
module.exports = mongoose.model('Patient', PatientSchema);
