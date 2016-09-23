'use strict';

app.directive('buttonGroup', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directive/html/buttonGroup.html',
        scope: {
            config: '='
        },
        controller: ['$scope', function ($scope) {

            var init = function () {
            };

            init();

        }]
    };

}]);
