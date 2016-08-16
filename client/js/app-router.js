'use strict';

app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', 
    function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'partials/app/app.html'
      })

      /**
       *    'Pacientes'
       */
      .state('app.paciente', {
        abstract: true,
        url: '/paciente',
        template: '<div ui-view></div>'
      })
      .state('app.paciente.list', {
        url: '/',
        templateUrl: 'partials/app/paciente/paciente.html',
        controller: 'PacienteController'
      })
      .state('app.paciente.create', {
        url: '/create',
        templateUrl: 'partials/app/paciente/paciente-edit.html',
        controller: 'PacienteEditController'
      });
      // .state('app.paciente.edit', {
      //   url: '/:id/edit',
      //   templateUrl: 'partials/app/paciente/paciente-edit.html',
      //   controller: 'PacienteEditController'
      // })
      // .state('app.paciente.new', {
      //   url: '/new',
      //   templateUrl: 'partials/app/paciente/paciente-edit.html',
      //   controller: 'PacienteEditController'
      // })
      // .state('app.paciente.show', {
      //   url: '/:id',
      //   templateUrl: 'partials/app/paciente/paciente-show.html',
      //   controller: 'PacienteShowController'
      // });

      /**
       *    'Access'
       */
      // .state('access', {
      //   abstract: true,
      //   templateUrl: 'partials/access/access.html'
      // })
      /**
       *    '404'
       */
      // .state('access.404', {
      //   url: '/404',
      //   templateUrl: 'partials/access/404.html',
      //   controller: 'AccessController',
      //   resolve: {}
      // })
      /**
       *    '403'
       */
      // .state('access.403', {
      //   url: '/403',
      //   templateUrl: 'partials/access/403.html',
      //   controller: 'AccessController',
      //   resolve: {}
      // });

  }])