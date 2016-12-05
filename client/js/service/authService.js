'use strict';

app.factory('AuthService', ['$http', '$localStorage', 'PromiseService', 
    function($http, $localStorage, PromiseService) {

    var adminUrl = 'https://ras-administration.herokuapp.com';

    return {

        isAuthenticated: function() {
            return PromiseService.execute(
                    $http.get(adminUrl + "/auth/authenticated"));
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