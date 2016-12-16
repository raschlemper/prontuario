'use strict';

app.controller('PatientEditProfessionalController', ['$scope',
  function ($scope) {

  var init = function () {
    $scope.setBreadcrumb('patientProfessional');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) return;
    $scope.getPatient();
  };

  init();

}]);