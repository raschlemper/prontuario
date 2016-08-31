'use strict';

app.controller('PatientEditController', ['$scope', '$state', '$stateParams', 'CepService',
  function ($scope, $state, $stateParams, CepService) {

  	$scope.genres = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
  	$scope.educationLevels = [{ id: 0, label: '1º grau incompleto' }, 
  	                          { id: 1, label: '1º grau completo' }, 
  	                          { id: 1, label: '2º grau incompleto' }, 
  	                          { id: 1, label: '2º grau completo' }, 
  	                          { id: 1, label: '3º grau incompleto' }, 
  	                          { id: 1, label: '3º grau completo' }];
		
 	var init = function () {
 		$scope.menu = $stateParams.menu;
 		$scope.patient = {};
		$scope.genre = $scope.genres[0]; 
		$scope.schooling = $scope.educationLevels[0];
  	};

  	$scope.setMenu = function(menu) {
  		$scope.menu = menu;
  		$state.go("app.patient.edit", {menu: menu});
  	};

  	// GERAL /////

  	// CONTACT /////

  	// ADDRESS /////

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
	        $scope.patient.address[0].zipCode = zipCode.cep;
	        $scope.patient.address[0].city = zipCode.cidade;
	        $scope.patient.address[0].state = zipCode.estado;
	        $scope.patient.address[0].street = zipCode.logradouro;
	        $scope.patient.address[0].district = zipCode.bairro;
	    } else {
            $scope.patient.address[0].zipCode = '';
            $scope.patient.address[0].city = '';
            $scope.patient.address[0].state = '';
            $scope.patient.address[0].street = '';
            $scope.patient.address[0].district = '';	    	
	    }
  	};

  	// FAMILY /////

  	// GRADUATION /////

  	// PROFESSIONAL /////







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