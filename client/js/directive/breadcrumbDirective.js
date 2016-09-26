'use strict';

app.directive('breadcrumb', [function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directive/html/breadcrumb.html',
        scope: {
            states: '='
        },
        controller: ['$scope', '$state', function ($scope, $state) {

            var breadcrumbs = {
                app: { label: 'Inicio', link: { status: 'app', args: null } },
                patient: { label: 'Pacientes', link: { state: 'app.patient.list', args: null } },
                patientGeral: { label: 'Dados Paciente', link: { state: 'app.patient.edit', args: { menu: 'geral' } } },
                patientContact: { label: 'Contato', link: { state: 'app.patient.edit', args: { menu: 'contact' } } },
                patientAddress: { label: 'Endereço', link: { state: 'app.patient.edit', args: { menu: 'address' } } },
                patientFamily: { label: 'Familiar', link: { state: 'app.patient.edit', args: { menu: 'family' } } },
                patientGraduation: { label: 'Graduação', link: { state: 'app.patient.edit', args: { menu: 'graduation' } } },
                patientProfessional: { label: 'Profissional', link: { state: 'app.patient.edit', args: { menu: 'professional' } } }
            };

            $scope.goTo = function (link) {
                $state.go(link.state, link.args);
            };

            var getLinks = function () {
                return $state.current.name.split('.');
            };

            var setBreadcrumb = function () {
                // var links = getLinks();
                // links.map(function (link) {
                //     var breadcrumb = breadcrumbs[link];
                //     if(link === 'app') { $scope.breadcrumbHome = breadcrumbs['app']; }
                //     else if(breadcrumb) { $scope.breadcrumbs.push(breadcrumb); }
                // });

                var links = $scope.states;
                $scope.breadcrumbHome = breadcrumbs['app'];
                links.map(function(link) {
                    var breadcrumb = breadcrumbs[link.state];
                    breadcrumb.link.args = link.args || null;
                    $scope.breadcrumbs.push(breadcrumb);
                });
            };

            var init = function () {
                $scope.breadcrumbs = [];               
                setBreadcrumb();
            };

            $scope.$watchCollection('states', function(newValue, oldValue) {
                if(angular.equals(newValue, oldValue)) return;
                init();
            });

            init();

        }]
    };

}]);
