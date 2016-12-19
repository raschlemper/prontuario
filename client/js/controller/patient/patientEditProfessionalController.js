'use strict';

app.controller('PatientEditProfessionalController', ['$scope', 'ProfessionalHandler',
  function ($scope, ProfessionalHandler) {

  var init = function () {
    $scope.setBreadcrumb('patientProfessional');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) { setProfessional(); }
    else {
      $scope.getPatient()
        .then(function(data) {
          setProfessional();
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }   
  };

  var setProfessional = function() {
    $scope.patient.professionals = $scope.patient.professionals || addGraduation();
  };

  var addProfessional = function() {
    $scope.patient.professionals = [];
    $scope.patient.professionals.push(ProfessionalHandler.create());
  };

  init();

}]);