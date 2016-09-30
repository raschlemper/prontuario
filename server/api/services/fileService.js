'use strict';

var multer  =   require('multer');
var upload = multer({ dest: 'images/' });


module.exports = (function () {

    /**
     * Create image patient
     */
    var patient = function() {
        var storage = getStorage();
        return multer({ storage: storage }).single('userPhoto');
    };

    var getStorage = function() {
        return multer.diskStorage({
          destination: function (req, file, callback) {
            callback(null, './uploads');
          },
          filename: function (req, file, callback) {
            callback(null, file.originalname + '-' + Date.now());
          }
        });
    };
  
    return {
        patient: patient
    };

})();