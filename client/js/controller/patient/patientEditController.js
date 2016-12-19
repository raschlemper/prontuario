'use strict';

app.controller('PatientEditController', ['$scope', '$state', '$stateParams', 'PatientService', 'FileService', 'NotifyService',
  function ($scope, $state, $stateParams, PatientService, FileService, NotifyService) {

  $scope.genders = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
  $scope.maritalStatus = [{ id: 0, label: 'Solteiro(a)' }, { id: 1, label: 'Cadsado(a)' }, 
                          { id: 2, label: 'Divorciado(a)' }, { id: 3, label: 'Viúvo(a)' }];
  $scope.educationLevels = [{ id: 0, label: '1º grau incompleto' }, 
                            { id: 1, label: '1º grau completo' }, 
                            { id: 2, label: '2º grau incompleto' }, 
                            { id: 3, label: '2º grau completo' }, 
                            { id: 4, label: '3º grau incompleto' }, 
                            { id: 5, label: '3º grau completo' }];

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


  // TODO: Criar o handler to e from

  var patientToSaveHandler = function(patient) {
    // if($scope.patient.gender) { 
    //   patient.gender = $scope.patient.gender.selected || $scope.patient.gender.id;
    // }
    // if($scope.patient.family.father) { 
    //   patient.family.father.schooling = $scope.patient.family.father.schooling && $scope.patient.family.father.schooling.id;      
    // }
    // if($scope.patient.family.mother) { 
    //   patient.family.mother.schooling = $scope.patient.family.mother.schooling && $scope.patient.family.mother.schooling.id;      
    // }
    // if($scope.patient.family.partner) { 
    //   patient.family.partner.schooling = $scope.patient.family.partner.schooling && $scope.patient.family.partner.schooling.id;      
    //   patient.family.partner.maritalStatus = $scope.patient.family.partner.maritalStatus && $scope.patient.family.partner.maritalStatus.id;      
    // }
    // return patient;
    return PatientHandler.to(patient);
  }

  var patientToShowHandler = function(patient) {
    // patient.gender = $scope.genders[patient.gender];
    // patient.birthDate = moment(patient.birthDate).toDate();
    // var schoolingFather = $scope.educationLevels[patient.family.father.schooling];
    // patient.family.father.schooling = schoolingFather; 
    // var schoolingMother = $scope.educationLevels[patient.family.mother.schooling];
    // patient.family.mother.schooling = schooling; 
    // var schoolinPartner = $scope.educationLevels[patient.family.partner.schooling];
    // patient.family.partner.schooling = schooling; 
    // return patient;
    return PatientHandler.from(patient);
  }

  // var goToEdit = function() {
  //   $state.go('app.patient.list');
  // };

 	init();

}]);