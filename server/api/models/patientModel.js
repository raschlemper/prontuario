'use strict'

var mongoose = require('mongoose');
var Promise = require("bluebird");
var config = require('../../config/environment');
var PhoneSchema = require(config.resources.models + "/phoneModel");
var AddressSchema = require(config.resources.models + "/addressModel");
var FamilySchema = require(config.resources.models + "/familyModel");
var GraduationSchema = require(config.resources.models + "/graduationModel");
var ProfessionalSchema = require(config.resources.models + "/professionalModel");
// var deepPopulate = require('mongoose-deep-populate');

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

//TODO: Trnsformar o email em schema

var PatientSchema = new Schema({
  name: String,
  birthDate: Date,
  age: Number,
  gender: Number,
  maritalStatus: Number,
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
