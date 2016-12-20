'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var PhoneSchema = new Schema({
	number: String, 
	type: String
});

module.exports = PhoneSchema;
//module.exports = mongoose.model('Phone', PhoneSchema);
