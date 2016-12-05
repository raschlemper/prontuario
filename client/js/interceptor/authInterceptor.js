'use strict';

app.factory('AuthInterceptor', ['$rootScope', '$q', '$injector',
	function ($rootScope, $q, $injector) {   

	return {

    request: function(config) { 
    	var AuthService = $injector.get('AuthService'); 
  		if (AuthService.getToken()) {
    		config.headers.Authorization = AuthService.getToken();
  		}
  		return config;
    },

		responseError: function (rejection) {   
		  var AuthService = $injector.get('AuthService');  
      if (rejection.status === 401) {
        AuthService.createToken(null);
        $rootScope.goToLogin();
      }
      return $q.reject(rejection);
		}

	};

}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);