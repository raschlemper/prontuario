'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var GraduationSchema = new Schema({
  school: String, 
  type: String 
});

module.exports = GraduationSchema;
// module.exports = mongoose.model('Graduation', GraduationSchema);
