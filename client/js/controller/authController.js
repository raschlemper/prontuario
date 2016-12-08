'use strict';

app.controller('AuthController', ['$rootScope', '$scope', '$state', '$stateParams', '$location', '$sce', 'AuthService',
  function ($rootScope, $scope, $state, $stateParams, $location, $sce, AuthService) {

	var init = function () {
		$scope.actions = {};
		$scope.actions.local = getUrl('local');
		$scope.actions.google = getUrl('google');
		$scope.error = getError($location.search().error);
	};

	var getUrl = function(strategy) {
		var url  = AuthService.getUrlAdmin() + '/';
		    url += strategy + '/';
		    url += AuthService.getSystem();
		    url += '?target=' + getTarget();
		return $sce.trustAsResourceUrl(url);
	};

	var getTarget = function() {
		return $location.protocol() + '://' + $location.host() + ':' + $location.port();
	};

	var getError = function(error) {
		switch(error) {
		    case 'APPLICATION_INCORRECT':
		        return "Problemas com aplicação.";
		    case 'EMAIL_NOT_REGISTERED':
		        return "Email não registrado.";
		    case 'PASSWORD_NOT_CORRECT':
		        return "Senha incorreta.";
		    case 'SYSTEM_NOT_AUTHORIZED':
		        return "Sistema sem permissão.";
		}
	};	

  	init();

}]);