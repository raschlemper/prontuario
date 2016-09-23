'use strict';

app.controller('PatientController', ['$scope', '$state', 'PatientService',
  function ($scope, $state, PatientService) {

	var init = function () {
		initTable();
		getAll();
	};

  var initTable = function() {
		$scope.columns = [
			{ label: '#',         value: 'id'       },
			{ label: 'Foto',      value: 'picture', headerClass: 'no-sort', filter: {name: 'userPicture', args: null} },
			{ label: 'Nome',      value: 'name',    filter: {name: 'telefone', args: null} },
			{ label: 'Telefone',  value: 'phone',   filter: {name: 'telefone', args: null} },
			{ label: 'Email',     value: 'email'    },
			{ label: '',          value:  '',       lineClass: 'text-center',  headerClass: 'no-sort', filter: {name: 'btnEdit', args: null, callback: 'events.edit(item)'} }
		];
  };

	$scope.events = {
		edit: function(item) {
			$state.go('app.patient.edit', {menu: 'geral', id: item._id});
		}
	}

  $scope.config = {
    events: { 
      create: function(item) {
        console.log(item)
      }
    }
  }

	var getAll = function() {   
      PatientService.getAll()
          .then(function(data) {
          	$scope.users = data;
          })
          .catch(function(e) {
          	console.log(null);
          });    
	}

  init();

}]);