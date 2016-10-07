'use strict';

var config = require('../../config/environment');
var fileService = require(config.resources.services + '/fileService');

module.exports = (function () {
  
  var patient = function (req, res, next) {
      var form = fileService.patient();
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });

      form.on('end', function() {
        res.end('success');
      });
      
      form.parse(req);
  }

  return {
    patient: patient
  };

})();
