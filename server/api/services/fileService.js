'use strict';

var multer = require('multer');

module.exports = (function () {

    /**
     * Create image patient
     */
    var patient = function() {
        var storage = getStorage();
        return multer({ storage: storage });
    };

    var getStorage = function() {
        return multer.diskStorage({
          destination: function (req, file, callback) {
            console.log('destination');
            callback(null, './uploads');
          },
          filename: function (req, file, callback) {
            console.log('filename');
            callback(null, file.originalname + '-' + Date.now());
          }
        });
    };
  
    return {
        patient: patient
    };

})();