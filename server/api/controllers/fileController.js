'use strict';

var config = require('../../config/environment');
var formidable = require('formidable');
var path = require('path');
var fileService = require(config.resources.services + '/fileService');

module.exports = (function () {
  
  var findPatient = function (req, res, next) {
      fileService.findPatient(req.params.name)
        .then(function(content) {
            console.log(req.params.name, content);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(content, 'binary');
        }).error(function(err) {
            if(req.params.name == 'patient') {
              next(err);
            }
            req.params.name = 'patient';
            findPatient(req, res, next);
        });
  }
  
  var savePatient = function (req, res, next) {
      var form = new formidable.IncomingForm();
      form.multiples = true;
      form.uploadDir = path.join(config.resources.images, '/patient');

      form.on('file', function(field, file) {
        fileService.savePatient(file);
      });
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });
      form.on('end', function() {
        res.end('success');
      });
      
      form.parse(req);
  }

  return {
    findPatient: findPatient,
    savePatient: savePatient
  };

})();
