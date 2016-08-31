'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var Patient = require(config.resources.models + '/patientModel');

module.exports = (function () {

  var findAll = function () {
    return Patient.findAsync({});
  };

  var findById = function (patientId) {
    return Patient.findByIdAsync(patientId);
  };

  var save = function (patient) {
    return Patient.createAsync(patient);
  };

  var update = function(patientId, patient) {
    return Patient.findByIdAndUpdateAsync(patientId, patient);
  };

  var remove = function (patientId) {
    Patient.findByIdAndRemoveAsync(patientId);
  };

  return {
    findAll: findAll,
    findById: findById,
    save: save,
    update: update,
    remove: remove
  }

})();
