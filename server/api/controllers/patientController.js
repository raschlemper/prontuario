'use strict';

var config = require('../../config/environment');
var patientService = require(config.resources.services + '/patientService');
var Patient = require(config.resources.models + '/patientModel');

module.exports = (function () {
  
  var findAll = function (req, res, next) {
    patientService.findAll()
      .then(function (patients) {
        res.send(patients);
      })
      .catch(function(err) {
        next(err);
      });
  };

  var findById = function (req, res, next) {
    patientService.findById(req.params.id)
      .then(function (patient) {
        res.send(patient);
      })
      .catch(function(err) {
        next(err);
      });
  };

  var save = function (req, res, next) {
    patientService.save(req.body)
      .then(function (patient) {
        res.send(patient);
      }, function(err) {
        next(err);
      });
  };

  var update = function (req, res, next) {
    var patient = new Patient(req.body);
    patientService.update(req.params.id, patient)
      .then(function (data) {
        res.send(patient);
      })
      .catch(function(err) {
        next(err);
      });
  };

  var remove = function (req, res, next) {
    patientService.remove(req.params.id)
      .then(function (del) {
        res.send(200);
      })
      .catch(function(err) {
        next(err);
      });
  };

  
  return {
    findAll: findAll,
    findById: findById,
    save: save,
    update: update,
    remove: remove
  };

})();
