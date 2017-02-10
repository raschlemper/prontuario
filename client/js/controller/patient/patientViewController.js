'use strict';

app.controller('PatientViewController', ['$scope', '$state', '$stateParams', 'PatientService', 
  'FileService', 'PatientHandler', 'LISTS',
  function ($scope, $state, $stateParams, PatientService, FileService, PatientHandler, LISTS) {

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

 	var init = function() {
    getPatient();
 	};

  $scope.setBreadcrumb = function(breadcrumb) {
     $scope.toolbar.breadcrumb.pop();
     $scope.toolbar.breadcrumb.push({ state: breadcrumb });
  };  

	// ACTION /////

  var getPatient = function() {  
    if(!$stateParams.id) return;
    return PatientService.get($stateParams.id)
      .then(function(data) {
        $scope.patient = patientToShowHandler(data); 
      })
      .catch(function(e) {
        console.log(e);
      });    
  };

  $scope.getImage = function(name) {
    return FileService.urlPacient(name);
  };

  var patientToShowHandler = function(patient) {
    return PatientHandler.from(patient);
  }
  
 	init();

}]);