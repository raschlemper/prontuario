'use strict';

app.directive('toolbar', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directive/html/toolbar.html',
        scope: {
            breadcrumb: '=',
            buttonGroup: '='
        },
        controller: ['$scope', function ($scope) {

            var init = function () {
                
            };

            init();

        }]
    };

}]);
