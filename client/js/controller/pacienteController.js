'use strict';

app.controller('PacienteController', ['$scope', '$http',
  function ($scope, $http) {

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
		$http.get('../../users.json').success(function (data) {
		  	$scope.users = data;
		});
  	}

  init();

}]);