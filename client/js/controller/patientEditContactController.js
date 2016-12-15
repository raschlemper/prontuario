   'use strict';

   app.controller('PatientEditContactController', ['$scope',
   function ($scope) {

    var init = function () {
      $scope.setBreadcrumb('patientContact');
      getPatient();
   	};

    var getPatient = function() {
      if($scope.patient) { setContact(); }
      else {
        $scope.getPatient()
          .then(function(data) {
            setContact();
          })
          .catch(function(e) {
            console.log(e);
          }); 
      }   
    }

    var setContact = function() {
      $scope.patient.emails = $scope.patient.emails || [];
      $scope.patient.phones = $scope.patient.phones || [];
      // addEmail();
    };

    var addEmail = function() {
      $scope.patient.emails[0] = $scope.patient.emails[0] || {};
      $scope.patient.emails[1] = $scope.patient.emails[1] || {};
    }

    var addPhone = function() {
      return { number: null, type: 'celular' }
    }

    init();

   }]);