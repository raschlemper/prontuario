'use strict';

app.controller('PatientController', ['$scope', '$state', 'PatientService',
  function ($scope, $state, PatientService) {

	var init = function () {
		getAll();
	};

	$scope.alphabet = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ];

	$scope.table = {
		events: {
			edit: function(item) {
				$state.go('app.patient.edit', {menu: 'geral', id: item._id});
			}
		},
		columns: [
			{ label: '#',         value: 'id'       },
			{ label: 'Foto',      value: 'picture', headerClass: 'no-sort', filter: {name: 'userPicture', args: null} },
			{ label: 'Nome',      value: 'name',    filter: {name: 'telefone', args: null} },
			{ label: 'Telefone',  value: 'phone',   filter: {name: 'telefone', args: null} },
			{ label: 'Email',     value: 'email'    },
			{ label: '',          value:  '',       lineClass: 'text-center',  headerClass: 'no-sort', filter: {name: 'btnEdit', args: null, callback: 'events.edit(item)'} }
		]
	};

	$scope.toolbar = {
		breadcrumb: [{ state: 'patient' }],
		actions: {
			create: function() {
				goToEdit();
			}
		}
	};

	$scope.searchByAlphabet = function(letter) {
		$scope.letterSelected = letter;
		$scope.patientList = $scope.patients.filter(function(patient) {
			return patient.name.startsWith(letter);
		});
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
		$scope.letterSelected = $scope.alphabet[0];
		$scope.searchByAlphabet($scope.letterSelected);		
	}

	var goToEdit = function() {
		$state.go('app.patient.edit');
	};

  	init();

}]);