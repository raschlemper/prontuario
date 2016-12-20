'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var ProfessionalSchema = new Schema({
  profession: String, 
  company: String, 
  dateStart: Date, 
  lastJob: String 
});

module.exports = ProfessionalSchema;
// module.exports = mongoose.model('Professional', ProfessionalSchema);
