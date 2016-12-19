'use strict';

app.controller('PatientEditController', ['$scope', '$state', '$stateParams', 'PatientService', 
  'FileService', 'NotifyService', 'LISTS',
  function ($scope, $state, $stateParams, PatientService, FileService, NotifyService, LISTS) {

  $scope.genders = LISTS.genders;
  $scope.maritalStatus = LISTS.maritalStatus;
  $scope.educationLevels = LISTS.educationLevels;

  $scope.toolbar = {
    breadcrumb: [{ state: 'patient' }, { state: 'patientGeral' }],
    actions: {
      cancel: function() { goToList(); },
      save: function() { saveOrEdit(); }
    }
  };

 	var init = function () {
 	};

  $scope.setBreadcrumb = function(breadcrumb) {
     $scope.toolbar.breadcrumb.pop();
     $scope.toolbar.breadcrumb.push({ state: breadcrumb });
  };  

	// ACTION /////

  $scope.getPatient = function() {  
    if(!$stateParams.id) return;
    return PatientService.get($stateParams.id)
      .then(function(data) {
        $scope.patient = patientToShowHandler(data); 
      })
      .catch(function(e) {
        console.log(e);
      });    
  };

  var saveOrEdit = function() {      
    var patient = patientToSaveHandler(angular.copy($scope.patient));
    if(patient._id) {
      editPatient(patient._id, patient);
    } else {
      savePatient(patient);
    }
  };

	var savePatient = function(patient) {  		
    PatientService.save(patient)
      .then(function(data) {   
          uploadFilePatient(data._id, $scope.patient.image);
          $scope.patient = patientToShowHandler(data); 
          NotifyService.success('Paciente inserido com sucesso!');
      })
      .catch(function(e) {
          NotifyService.error('Problemas ao inserir o paciente!');
      });            
	};

  var editPatient = function(id, patient) {      
    PatientService.update(id, patient)
      .then(function(data) {   
          uploadFilePatient(id, $scope.patient.image);
          $scope.patient = patientToShowHandler(data); 
          NotifyService.success('Paciente alterado com sucesso!');
      })
      .catch(function(e) {
          NotifyService.error('Problemas ao alterar o paciente!');
      });            
  };

  var uploadFilePatient = function(name, file) { 
    if(!file || !file.length) { init(); } 
    else { uploadFile(name, file); }         
  };

  var uploadFile = function(name, file) { 
    FileService.savePatient(name, file[0])
      .then(function(data) {            
        init();
        NotifyService.success('Imagem inserida com sucesso!');
      })
      .catch(function(e) {
          NotifyService.error('Problemas ao inserir a imagem!');
      });            
  };

  var patientToSaveHandler = function(patient) {
    return PatientHandler.to(patient);
  }

  var patientToShowHandler = function(patient) {
    return PatientHandler.from(patient);
  }

  // var goToEdit = function() {
  //   $state.go('app.patient.list');
  // };

 	init();

}]);