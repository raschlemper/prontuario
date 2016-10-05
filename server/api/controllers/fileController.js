'use strict';

var config = require('../../config/environment');
var fileService = require(config.resources.services + '/fileService');

module.exports = (function () {
  
  var patient = function (req, res, next) {
      var upload = fileService.patient();
      console.log(upload);
      upload.single('userPhoto')
  };
  
  var sendResult = function (req, res, next) {
        console.log('OK');
        res.send(200);
  }

  return {
    patient: patient,
    sendResult: sendResult
  };

})();
