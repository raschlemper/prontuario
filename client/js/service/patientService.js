'use strict';

app.factory('PatientService', ['$http', 'PromiseService', 
    function($http, PromiseService) {

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
            return PromiseService.execute(
                    $http.post("/api/patient/", data));
        },

        update: function(idPatient, data) {
            return PromiseService.execute(
                    $http.put("/api/patient/" + idPatient, data));
        },

        delete: function(idPatient) {
            return PromiseService.execute(
                    $http.delete("/api/patient/" + idPatient));
        }

    }

}]);