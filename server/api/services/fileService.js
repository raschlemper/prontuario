'use strict';

var config = require('../../config/environment');
var path = require('path');
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

module.exports = (function () {

    /**
     * Find image patient
     */
    var findPatient = function(name) {
      console.log(name);
      var imageDir = path.join(config.resources.images, '/patient/', name);
      return fs.readFileAsync(imageDir);
    };

    /**
     * Create image patient
     */
    var savePatient = function(file) {
      var imageDir = path.join(config.resources.images, '/patient', file.name);
      fs.rename(file.path, imageDir);
    };
  
    return {
      findPatient: findPatient,
      savePatient: savePatient
    };

})();