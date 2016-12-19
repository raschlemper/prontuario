'use strict';

app.controller('PatientEditContactController', ['$scope', 'PhoneHandler',
  function ($scope, PhoneHandler) {

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
    $scope.patient.emails = $scope.patient.emails || addEmail();
    $scope.patient.phones = $scope.patient.phones || addPhone();
  };

  var addEmail = function() {
    $scope.patient.emails = [];
    $scope.patient.emails[0] = null;
    $scope.patient.emails[1] = null;
  };

  var addPhone = function() {
    $scope.patient.phones = [];
    $scope.patient.phones[0] = PhoneHandler.create('telephone');
    $scope.patient.phones[1] = PhoneHandler.create('celular');
    $scope.patient.phones[2] = PhoneHandler.create('celular');
  };

  init();

}]);