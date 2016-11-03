'use strict';

app.directive('toolbar', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directive/html/toolbar.html',
        scope: {
            title: '@',
            subtitle: '@',
            breadcrumb: '=',
            actions: '='
        },
        controller: ['$scope', function ($scope) {

            var init = function () {
                $scope.states = $scope.breadcrumb;
                $scope.actions = $scope.actions;
            };

            init();

        }]
    };

}]);
