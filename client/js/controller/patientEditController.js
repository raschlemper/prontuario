'use strict';

app.controller('PatientEditController', ['$scope', 
  function ($scope) {

  	var genres = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
		
 	var init = function () {
		$scope.genres = genres;
  	};

  	init();

}]);