'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");
var PhoneSchema = require("./phoneSchema");
var AddressSchema = require("./addressSchema");
var FamilySchema = require("./familySchema");
var GraduationSchema = require("./graduationSchema");
var ProfessionalSchema = require("./professionalSchema");
// var deepPopulate = require('mongoose-deep-populate');

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

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
  	mother: FamilySchema,
    partner: FamilySchema,
    sublings: [ FamilySchema ],
    children: [ FamilySchema ]
  },
  graduations: [ GraduationSchema ],
  professionals: [ ProfessionalSchema ]

});

// PatientSchema.plugin(deepPopulate);
module.exports = mongoose.model('Patient', PatientSchema);
