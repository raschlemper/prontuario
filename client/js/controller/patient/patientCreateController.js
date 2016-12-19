'use strict';

app.controller('PatientCreateController', ['$scope', '$uibModalInstance', 'PatientService', 'PatientHandler',
  'NotifyService',
  function ($scope, $uibModalInstance, PatientService, PatientHandler, NotifyService) {
	
  var init = function() {
    $scope.patient = PatientHandler.create();
  };

  $scope.save = function(patient) {  
    patient = patientToSaveHandler(patient);
    savePatient(patient);
  };

  var savePatient = function(patient) {     
    PatientService.save(patient)
      .then(function(data) {   
        NotifyService.success('Paciente inserido com sucesso!');
        $scope.ok(patient);
      })
      .catch(function(e) {
        NotifyService.error('Problemas ao inserir o paciente!');
      });            
  };

  var patientToSaveHandler = function(patient) {
    return PatientHandler.to(patient);;
  };

  $scope.ok = function(pacient) {
    $uibModalInstance.close(pacient);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
       	
  init();

}]);