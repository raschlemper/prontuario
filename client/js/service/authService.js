'use strict';

app.factory('AuthService', ['$http', '$localStorage', 'PromiseService', 
    function($http, $localStorage, PromiseService) {

    var adminUrl = 'https://prosoft-admin.herokuapp.com';
    var system = '5845bdd14d2a8b0012af9ab8';

    return {

        isAuthenticated: function() {
            return PromiseService.execute(
                    $http.get(adminUrl + "/auth/authenticated/" + system));
        },

        getUrlAdmin: function() {
            return adminUrl;
        },

        getSystem: function() {
            return system;
        },

        getUser: function() {
            return PromiseService.execute(
                    $http.get(adminUrl + "/auth/token/user"));
        },

        createToken: function(token) {
        	$localStorage.token = token;
        },

		getToken: function() {
        	return $localStorage.token;
        }

    }

}]);