'use strict';

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

module.exports = (function () {

    /**
     * Create image patient
     */
    var patient = function(req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/uploads');

        form.on('file', function(field, file) {
          console.log(file);
          fs.rename(file.path, path.join(form.uploadDir, file.name));
        });       

        return form;
    };
  
    return {
        patient: patient
    };

})();