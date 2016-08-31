'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");
// var deepPopulate = require('mongoose-deep-populate');

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
  name: String
});

// PatientSchema.plugin(deepPopulate);
module.exports = mongoose.model('Patient', PatientSchema);
