'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

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

module.exports = AddressSchema;
// module.exports = mongoose.model('Address', AddressSchema);
