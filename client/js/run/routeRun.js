app.run(['$rootScope', '$state', function ($rootScope, $state) {    

    $rootScope.goTo = function(state, params, options) {
        $state.go(state, params, options);
    };

    $rootScope.goToLogin = function(params) {
        $rootScope.goTo('auth.login', params, { reload: true });
    };

    $rootScope.goToIndex = function(params) {
        $rootScope.goTo('app.main', params, { reload: true });
    };

}]);