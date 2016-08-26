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
      .state('app.patient', {
        abstract: true,
        url: '/patient',
        template: '<div ui-view></div>'
      })
      .state('app.patient.list', {
        url: '/',
        templateUrl: 'partials/app/patient/patient.html',
        controller: 'PatientController'
      })
      .state('app.patient.edit', {
        url: '/edit',
        templateUrl: 'partials/app/patient/patient-edit.html',
        controller: 'PatientEditController'
      })
      .state('app.patient.edit.geral', {
        url: '/geral',
        templateUrl: 'partials/app/patient/patient-edit-geral.html',
        controller: 'PatientEditController'
      })
      .state('app.patient.edit.contact', {
        url: '/contact',
        templateUrl: 'partials/app/patient/patient-edit-contact.html',
        controller: 'PatientEditController'
      });
      // .state('app.patient.edit', {
      //   url: '/:id/edit',
      //   templateUrl: 'partials/app/patient/patient-edit.html',
      //   controller: 'PacienteEditController'
      // })
      // .state('app.patient.new', {
      //   url: '/new',
      //   templateUrl: 'partials/app/patient/patient-edit.html',
      //   controller: 'PacienteEditController'
      // })
      // .state('app.patient.show', {
      //   url: '/:id',
      //   templateUrl: 'partials/app/patient/patient-show.html',
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