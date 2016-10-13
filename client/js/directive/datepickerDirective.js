app.directive('datepicker', function() {
    
    return {
        restrict: 'E',
        templateUrl: "js/directive/html/datepicker.html",
        scope: { datepickerModel: '=', events: '=' },
        link: function($scope, element, attr, controller) {  
            
            var init = function() {
                $scope.datepicker = {
                    'format': 'dd/MM/yyyy',
                    'close': 'Fechar',
                    'clear': 'Limpar',
                    'today': 'Hoje',
                    'opened': false,
                    'open': function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        this.opened = true;
                    }
                },    
                $scope.name = attr.name;     
                $scope.placeholder = attr.placeholder;
                $scope.datepickerModel = $scope.datepickerModel;
            };      
            
            init();
        }
    }
});