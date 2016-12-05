'use strict';

app.factory('RouteService', [function() {

    var publicRoutes = ['auth.login']

    return {

        isPublic: function(route) {
            if(publicRoutes.indexOf(route) > -1) return true;
            return false;
        }

    }

}]);