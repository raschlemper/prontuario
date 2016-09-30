'use strict';

var config = require('../../config/environment');
var fileService = require(config.resources.services + '/fileService');

module.exports = (function () {
  
  var patient = function (req, res, next) {
      fileService.patient().then(function () {
          console.log('OK');
          next();
      }, function(err) {
          console.log(err);
          next(err);
      });
  };
  
  return {
    patient: patient
  };

})();
