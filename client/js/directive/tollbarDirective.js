'use strict';

app.directive('toolbar', [function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/toolbar.html',
        scope: {
            breadcrumb: '=',
            buttonGroup: '='
        },
        controller: ['$scope', 'api', function ($scope, api) {

            var init = function () {
                if(!$scope.events) { $scope.events = {}; }
                if(!$scope.events.wiki) { $scope.events.wiki = { action: wiki } }
            };

            $scope.showButton = function(role, event) {
                if(!$scope.events || !$scope.events[event] || !$scope.events[event].show) return false;
                if(!$scope.roles) return true;
                if($scope.roles.indexOf(role) > -1 && $scope.events[event]) return true;
                return false;
            }
            
            var wiki = function (funcao) {
                if(!funcao) return;
                window.open('http://gwiki.gennera.com.br/index.php?title=' + funcao, 
                            'Wiki', 
                            'toolbar=yes, menubar=yes, location=yes, directories=yes, scrollbars=yes, resizable=yes, status=yes, top=0, left=0, width=750, height=500', 
                            false);
            };      

            init();

        }]
    };

}]);
