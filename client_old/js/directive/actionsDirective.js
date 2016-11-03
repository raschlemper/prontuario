'use strict';

app.directive('actions', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directive/html/actions.html',
        scope: {
            actions: '='
        },
        controller: ['$scope', function ($scope) {

            var init = function () {

            };

            $scope.canAction = function(action) {
                if(!$scope.actions) return false;
                return $scope.actions[action] || false;
            }

            init();

        }]
    };

}]);
