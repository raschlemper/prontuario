'use strict';

app.controller('PatientEditGraduationController', ['$scope',
  function ($scope) {

  var init = function () {
    $scope.setBreadcrumb('patientGraduation');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) return;
    $scope.getPatient();
  };

  init();

}]);