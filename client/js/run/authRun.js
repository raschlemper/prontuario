app.run(['$rootScope', '$state', '$location', '$localStorage', 'AuthService', 'RouteService', 
    function ($rootScope, $state, $location, $localStorage, AuthService, RouteService) {    

    var error = {}; 
    var token = null;

    $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams) {
        getError(event, toState, toParams);
        getToken(event, toState, toParams);
        setToken(event, toState, toParams);
        authenticated(event, toState, toParams);
    });

    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams) {
        setError(event, toState, toParams);        
    });

    var getError = function(event, toState, toParams) {
        error = $location.search().error;
        if (error) {             
            removeToken(event, toState, toParams);
        }         
    };

    var setError = function(event, toState, toParams) {
        if (error) {             
            removeToken(event, toState, toParams);
            $location.search('error', error);             
            if(!RouteService.isPublic(toState.name)) {
                $rootScope.goToLogin(); 
            }
        }
    };

    var getToken = function(event, toState, toParams) {
        token = $location.search().token || AuthService.getToken();
        if (!token) {  
            if(!RouteService.isPublic(toState.name)) {
                event.preventDefault();
                $rootScope.goToLogin(); 
            }
        }         
    };

    var setToken = function(event, toState, toParams) {
        removeToken(event, toState, toParams);
        if (token) { AuthService.createToken(token); }
    };

    var removeToken = function(event, toState, toParams) {  
        $location.search('token', null);
    };

    var removeError = function(event, toState, toParams) {  
        $location.search('error', null);
    };

    var authenticated = function(event, toState, toParams) {
        if(!RouteService.isPublic(toState.name)) {
            AuthService.isAuthenticated()
                .then(function(data) {
                    $rootScope.user = data;
                    $rootScope.goTo(toState, toParams); 
                })
                .catch(function(e) { 
                    AuthService.createToken(null);
                    $rootScope.goToLogin();               
                });
        } 
    };

    $rootScope.logout = function () {
        AuthService.createToken(null);
        $rootScope.goToLogin();  
    };

}]);