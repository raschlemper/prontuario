'use strict';

app.controller('PatientEditController', ['$scope', '$state', 'CepService',
  function ($scope, $state, CepService) {

  	$scope.genres = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
  	$scope.educationLevels = [{ id: 0, label: '1º grau incompleto' }, 
  	                          { id: 1, label: '1º grau completo' }, 
  	                          { id: 1, label: '2º grau incompleto' }, 
  	                          { id: 1, label: '2º grau completo' }, 
  	                          { id: 1, label: '3º grau incompleto' }, 
  	                          { id: 1, label: '3º grau completo' }];
		
 	var init = function () {
 		$scope.menu = 'geral';
 		$scope.patient = {};
		$scope.genre = $scope.genres[0]; 
		$scope.schooling = $scope.educationLevels[0];
  	};

  	$scope.setMenu = function(menu) {
  		$scope.menu = menu;
  		$state.go("app.patient.edit." + menu);
  	};

  	$scope.addEmail = function(email) {  		
  		$scope.emails.push(angular.copy(email));
  	};





  	$scope.searchZipCode = function(zipCode) {
        CepService.cep(zipCode)
            .then(function(data) {
            	setZipCode(data);
            })
            .catch(function(e) {
            	setZipCode(null);
            });
  	};

  	var setZipCode = function(zipCode) {
  		if(zipCode) {
	        $scope.patient.address.zipCode = zipCode.cep;
	        $scope.patient.address.city = zipCode.cidade;
	        $scope.patient.address.state = zipCode.estado;
	        $scope.patient.address.street = zipCode.logradouro;
	        $scope.patient.address.district = zipCode.bairro;
	    } else {
            $scope.patient.address.zipCode = '';
            $scope.patient.address.city = '';
            $scope.patient.address.state = '';
            $scope.patient.address.street = '';
            $scope.patient.address.district = '';	    	
	    }
  	};

  	$scope.addSibling = function(sibling) {
  		if(!$scope.patient.family) { $scope.patient.family = {}; }
  		if(!$scope.patient.family.siblings) { $scope.patient.family.siblings = []; }
  		$scope.patient.family.siblings.push(angular.copy(sibling));
  	};

  	$scope.delSibling = function(sibling) {
  		var index = $scope.patient.family.siblings.indexOf(sibling);
  		if (index > -1) {
    		$scope.patient.family.siblings.splice(index, 1);
		}
  	};

  	init();

}]);