'use strict';

app.factory('PatientService', ['$http', 'PromiseService', 
    function($http, PromiseService) {

    var getFormData = function(data, file) {        
        var formData = new FormData();
        formData.append('patient', data);
        formData.append('file', file);   
        return formData;   
    }

    return {

        getAll: function() {
            return PromiseService.execute(
                    $http.get("/api/patient/"));
        },

        get: function(idPatient) {
            return PromiseService.execute(
                    $http.get("/api/patient/" + idPatient));
        },

        save: function(data) {
            // var formData = getFormData(data, file);
            return PromiseService.execute(
                    $http.post("/api/patient/", data));
        },

        update: function(idPatient, data, file) {
            // var formData = getFormData(data, file);
            return PromiseService.execute(
                    $http.put("/api/patient/" + idPatient, data));
        },

        delete: function(idPatient) {
            return PromiseService.execute(
                    $http.delete("/api/patient/" + idPatient));
        }

    }

}]);