'use strict';

app.directive('sidebar', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directive/html/sidebar.html',
        scope: {
            state: '=',
            menu: '='
        },
        controller: ['$scope', function ($scope) {

            var init = function () {
                $scope.state = $scope.state
                $scope.menu = $scope.menu;
            };

            init();

        }]
    };

}]);
