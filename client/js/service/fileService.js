'use strict';

app.factory('FileService', ['$http', 'PromiseService', 
    function($http, PromiseService) {

    var getFormData = function(name, file) {        
        var formData = new FormData();
        formData.append('file', file, name);
        return formData;   
    }

    return {

        findPatient: function(name) {
            return PromiseService.execute(
                $http.get('/api/file/patient/' + name, 
                    { headers: {'Content-Type': 'image/png'}, responseType: 'blob' }));
        },

        savePatient: function(name, file) {
            var data = getFormData(name, file);
            return PromiseService.execute(
                $http.post('/api/file/patient', data, 
                    { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }));
        }

    }

}]);