'use strict';

app.controller('PatientEditController', ['$scope', '$state', '$stateParams', 'PatientService', 'CepService',
  function ($scope, $state, $stateParams, PatientService, CepService) {

  	$scope.genres = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
  	$scope.maritalStatus = [{ id: 0, label: 'Solteiro(a)' }, { id: 1, label: 'Cadsado(a)' }, 
  	                        { id: 2, label: 'Divorciado(a)' }, { id: 3, label: 'Viúvo(a)' }];
  	$scope.educationLevels = [{ id: 0, label: '1º grau incompleto' }, 
  	                          { id: 1, label: '1º grau completo' }, 
  	                          { id: 2, label: '2º grau incompleto' }, 
  	                          { id: 3, label: '2º grau completo' }, 
  	                          { id: 4, label: '3º grau incompleto' }, 
  	                          { id: 5, label: '3º grau completo' }];
		
 	var init = function () {
 		$scope.menu = $stateParams.menu;
 		$scope.patient = $scope.patient || {};
  		initFactory($scope.menu);
  	};

  	$scope.setMenu = function(menu) {
  		$scope.menu = menu;
  		$state.go("app.patient.edit", {menu: menu});
  	};

  	var initFactory = function(menu) {
  		switch(menu) {
		    case 'geral': initGeral(); break;
		    case 'contact': initContact(); break;
		    case 'address': initAddress(); break;
		    case 'family': initFamily(); break;
		    case 'graduation': initGraduation(); break;
		    case 'professional': initProfessional(); break;
		    default: initGeral();
		}
  	};

  	// GERAL /////

  	var initGeral = function () { 
 		$scope.label = 'Dados Paciente';
		$scope.patient.genre = angular.copy($scope.genres[0]); 
	};

  	// CONTACT /////

  	var initContact = function () { 
 		$scope.label = 'Contato';
 	};

  	// ADDRESS /////

  	var initAddress = function () { 
 		$scope.label = 'Endereço';
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

  	var initFamily = function () { 
 		$scope.label = 'Familiar';
  		$scope.patient.family = $scope.patient.family || {};
  		$scope.patient.family.father = $scope.patient.family.father || {};
  		$scope.patient.family.mother = $scope.patient.family.mother || {};
  		$scope.patient.family.partner = $scope.patient.family.partner || {};
  		$scope.patient.family.sublings = $scope.patient.family.sublings || [];
  		$scope.patient.family.children = $scope.patient.family.children || [];
		$scope.patient.family.father.schooling = angular.copy($scope.educationLevels[0]);
		$scope.patient.family.mother.schooling = angular.copy($scope.educationLevels[0]);
		$scope.patient.family.partner.schooling = angular.copy($scope.educationLevels[0]);
		$scope.patient.family.partner.maritalStatus = angular.copy($scope.maritalStatus[0]);
  		$scope.addSubling();
  		$scope.addChild();
  	};

	$scope.addSubling = function() {
    	$scope.patient.family.sublings.push(createFamily());
	};

	$scope.addChild = function() {
    	$scope.patient.family.children.push(createFamily());
	};

	var createFamily = function() {
		return { 'name': null, 'age': null };
	};

  	// GRADUATION /////

  	var initGraduation = function () {
 		$scope.label = 'Escolaridade';
 	};

  	// PROFESSIONAL /////

  	var initProfessional = function () { 
 		$scope.label = 'Profissional';
 	};

  	// ACTION /////

  	$scope.save = function(form, patient) {  		
        PatientService.save(patient)
            .then(function(data) {  
                console.log(data);
            })
            .catch(function(e) {
                console.log(e);
            });            
  	};

  	init();

}]);