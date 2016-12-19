'use strict';

app.controller('PatientEditGraduationController', ['$scope', 'GraduationHandler',
  function ($scope, GraduationHandler) {

  var init = function () {
    $scope.setBreadcrumb('patientGraduation');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) { setGraduation(); }
    else {
      $scope.getPatient()
        .then(function(data) {
          setGraduation();
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }   
  };

  var setGraduation = function() {
    $scope.patient.graduations = $scope.patient.graduations || addGraduation();
  };

  var addGraduation = function() {
    $scope.patient.graduations = [];
    $scope.patient.graduations[0] = GraduationHandler.create('elementarySchool');
    $scope.patient.graduations[1] = GraduationHandler.create('highSchool');
    $scope.patient.graduations[2] = GraduationHandler.create('undergraduate');
  };

  init();

}]);