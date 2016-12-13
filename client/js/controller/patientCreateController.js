'use strict';

app.controller('PatientCreateController', ['$scope', '$uibModalInstance', 'PatientService', 'NotifyService',
  function ($scope, $uibModalInstance, PatientService, NotifyService) {
	
  $scope.genders = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];

  var init = function() {
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
    patient.gender = $scope.patient.gender.selected;
    return patient;
  }

  $scope.ok = function(pacient) {
    $uibModalInstance.close(pacient);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
       	
  init();

}]);