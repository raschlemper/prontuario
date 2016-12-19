'use strict';

app.controller('PatientController', ['$scope', '$state', '$filter', 'PatientService', 'FileService',
	'ModalService', 'LISTS',
  function ($scope, $state, $filter, PatientService, FileService, ModalService, LISTS) {

	var init = function () {
		getAll();
	};
	
	// $scope.letters = LISTS.letters;

	// $scope.table = {
	// 	events: {
	// 		edit: function(item) {
	// 			$state.go('app.patient.edit', {menu: 'geral', id: item._id});
	// 		}
	// 	},
	// 	columns: [
	// 		{ label: '#',         value: 'id'       },
	// 		{ label: 'Foto',      value: 'picture', headerClass: 'no-sort', filter: {name: 'userPicture', args: null} },
	// 		{ label: 'Nome',      value: 'name',    filter: {name: 'telefone', args: null} },
	// 		{ label: 'Telefone',  value: 'phone',   filter: {name: 'telefone', args: null} },
	// 		{ label: 'Email',     value: 'email'    },
	// 		{ label: '',          value:  '',       lineClass: 'text-center',  headerClass: 'no-sort', filter: {name: 'btnEdit', args: null, callback: 'events.edit(item)'} }
	// 	]
	// };

	$scope.toolbar = {
		breadcrumb: [{ state: 'patient' }],
		actions: {
			create: function() { goToCreate(); }
		}
	};

	$scope.searchBy = function(letter, name) {
		var patients = angular.copy($scope.patients);
		if($scope.name) { patients = $scope.searchByName(patients, $scope.name); }
		patients = $scope.searchByLetter(patients, letter);
		$scope.patientList = patients;
	};

	$scope.searchByLetter = function(list, letter) {
		$scope.letterSelected = letter;
		if(!letter) { return list; }
		else { 
			return list.filter(function(patient) {
				return patient.name.toLowerCase().startsWith(letter.toLowerCase());
			});
		};		
	};

	$scope.searchByName = function(list, name) {
		return $filter('filter')(list, name);
	};

	$scope.getImage = function(name) {
		return FileService.urlPacient(name);
	};

	var getAll = function() {   
      PatientService.getAll()
          .then(function(data) {
          	$scope.patients = data;
          	$scope.patientList = angular.copy($scope.patients);
          	setLetter();
          })
          .catch(function(e) {
          	console.log(null);
          });    
	};

	var setLetter = function() {
		$scope.letterSelected = null;//$scope.letters[0];
		$scope.searchBy($scope.letterSelected, $scope.name);		
	};

	var goToCreate = function() {
		// $state.go('app.patient.create', { menu: 'geral' });
		var modalInstance = ModalService.default('partials/app/patient/patient-create.html', 'PatientCreateController', 'md', null);
		modalInstance.result
			.then(function() {
				getAll();
			});
	};

  	init();

}]);