'use strict';

app.controller('PatientController', ['$scope', '$http', 'PatientService',
  function ($scope, $http, PatientService) {

	var init = function () {
		initTable();
		getAll();
	};

  	var initTable = function() {
		$scope.columns = [
			{ label: '#',         value: 'id'       },
			{ label: 'Foto',      value: 'picture', headerClass: 'no-sort', filter: {name: 'userPicture', args: null} },
			{ label: 'Username',  value: 'username' },
			{ label: 'Nome',      value: 'name'     },
			{ label: 'Sobrenome', value: 'lastName' },
			{ label: 'Email',     value: 'email'    },
			{ label: 'Telefone',  value: 'phone'    }
		];
  	};

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