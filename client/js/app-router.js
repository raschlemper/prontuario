'use strict';

app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', 
    function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');

    $stateProvider

      /*
       * Application
       */
      .state('app', {
        url: '',
        templateUrl: 'partials/app/app.html'
      })

      /*
       * Main
       */      
      .state('app.main', {
        url: '/',
        template: '<div ui-view></div>',
        controller: 'AppController'
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
      .state('app.patient.view', {
        url: '/view/:id',
        templateUrl: 'partials/app/patient/patient-view.html',
        controller: 'PatientViewController'
      }) 
      .state('app.patient.edit', {
        abstract: true,
        url: '/edit',
        template: '<div ui-view></div>',
      }) 
      .state('app.patient.edit.profile', {
        url: '/profile/:id',
        templateUrl: 'partials/app/patient/patient-edit-profile.html',
        controller: 'PatientEditProfileController',
      })  

      /**
       *    'Consultas'
       */
      .state('app.calendar', {
        abstract: true,
        url: '/calendar',
        template: '<div ui-view></div>'
      }) 
      .state('app.calendar.list', {
        url: '/',
        templateUrl: 'partials/app/calendar/calendar.html',
        controller: 'CalendarController'
      }) 

      // .state('app.patient.edit', {
      //   abstract: true,
      //   url: '/edit/:id',
      //   templateUrl: 'partials/app/patient/patient-edit.html',
      //   controller: 'PatientEditController',
      // }) 
      // .state('app.patient.edit.geral', {
      //   url: '/geral',
      //   templateUrl: 'partials/app/patient/patient-edit-geral.html',
      //   controller: 'PatientEditGeralController',
      // }) 
      // .state('app.patient.edit.contact', {
      //   url: '/contact',
      //   templateUrl: 'partials/app/patient/patient-edit-contact.html',
      //   controller: 'PatientEditContactController',
      // }) 
      // .state('app.patient.edit.address', {
      //   url: '/address',
      //   templateUrl: 'partials/app/patient/patient-edit-address.html',
      //   controller: 'PatientEditAddressController',
      // })   
      // .state('app.patient.edit.family', {
      //   url: '/family',
      //   templateUrl: 'partials/app/patient/patient-edit-family.html',
      //   controller: 'PatientEditFamilyController',
      // })    
      // .state('app.patient.edit.graduation', {
      //   url: '/graduation',
      //   templateUrl: 'partials/app/patient/patient-edit-graduation.html',
      //   controller: 'PatientEditGraduationController',
      // })  
      // .state('app.patient.edit.professional', {
      //   url: '/professional',
      //   templateUrl: 'partials/app/patient/patient-edit-professional.html',
      //   controller: 'PatientEditProfessionalController',
      // }) 

      /*
       * Authentication
       */
      .state('auth', {
        abstract: true,
        url: '/auth',
        template: '<div ui-view></div>'
      })

      /*
       * Login
       */
      .state('auth.login', {
        url: '/login',
        templateUrl: 'partials/auth/login.html',
        controller: 'AuthController'
      });

  }])