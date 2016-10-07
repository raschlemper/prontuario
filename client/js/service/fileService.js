'use strict';

app.factory('FileService', ['$http', 'PromiseService', 
    function($http, PromiseService) {

    var getFormData = function(file) {        
        var formData = new FormData();
        formData.append('file', file);   
        return formData;   
    }

    return {

        patient: function(file) {
            var data = getFormData(file);
            return PromiseService.execute(
                $http.post('/api/file/patient', data, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }));
        }

    }

}]);