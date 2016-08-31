'use strict';

var config = require('../../config/environment');
var repository = require(config.resources.repositories + '/patientRepository');

module.exports = (function () {

  var findAll = function () {
    return repository.findAll();
  };

  var findById = function (id) {
    return repository.findById(id);
  };

  var save = function (patient) {
    return repository.save(patient);
  };

  var update = function (id, patient) {
    return repository.update(id, patient);
  };

  var remove = function (id) {
    return repository.remove(id);
  };

  return {
    findAll: findAll,
    findById: findById,
    save: save,
    update: update,
    remove: remove
  }

})();
