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
 		$scope.patient = $stateParams.patient || {};
		initFactory($scope.menu);
    getPatient($stateParams.id);
    //TODO: Fazer a pesquisa do paciente antes do init
	};

  	$scope.setMenu = function(menu) {
  		$scope.menu = menu;
  		$state.go("app.patient.edit", {menu: menu, id: $stateParams.id, patient: $scope.patient});
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

    var getLastIndex = function(list) {
      return list.length - 1;
    };

  	// GERAL /////

  	var initGeral = function () { 
 		$scope.label = 'Dados Paciente';
		$scope.patient.genre = angular.copy($scope.genres[0]); 
	};

  	// CONTACT /////

  	var initContact = function () { 
      $scope.label = 'Contato';
      $scope.patient.emails = $scope.patient.emails || [];
      $scope.patient.phones = $scope.patient.phones || [];
      addInitEmail();
      addInitPhone();
 	  };

    var addInitEmail = function() {
      var last = getLastEmail();
      if(!last || !last.url) {
        removeLastEmail();
        $scope.addEmail();
      }
    };

    var getLastEmail = function() {
      if(!$scope.patient.emails || !$scope.patient.emails.length) return;
      var lastIndex = getLastIndex($scope.patient.emails);
      return $scope.patient.emails[lastIndex];
    };

    $scope.addEmail = function() {  
      $scope.insertedEmail = {
        id: $scope.patient.emails.length + 1,
        url: ''
      };    
      $scope.patient.emails.push($scope.insertedEmail);
    };

    var removeLastEmail = function() { 
      var lastIndex = getLastIndex($scope.patient.emails);
      if(lastIndex > -1) { $scope.removeEmail(lastIndex); }
    };

    $scope.removeEmail = function(index) {  
      $scope.patient.emails.splice(index, 1);
    };

    var addInitPhone = function() {  
      var last = getLastPhone();
      if(!last || !last.number) {
        removeLastPhone();
        $scope.addPhone();
      }
    };

    var getLastPhone = function() {
      if(!$scope.patient.phones || !$scope.patient.phones.length) return;
      var lastIndex = getLastIndex($scope.patient.phones);
      return $scope.patient.phones[lastIndex];
    };

    $scope.addPhone = function() {  
      $scope.insertedPhone = {
        id: $scope.patient.phones.length + 1,
        number: ''
      };    
      $scope.patient.phones.push($scope.insertedPhone);
    };

    var removeLastPhone = function() { 
      var lastIndex = getLastIndex($scope.patient.phones);
      if(lastIndex > -1) { $scope.removePhone(lastIndex); }
    };

    $scope.removePhone = function(index) {  
      $scope.patient.phones.splice(index, 1);
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

    var getPatient = function(id) {  
      if(!id) return;
      PatientService.get(id)
          .then(function(data) {
            $scope.patient = data;
          })
          .catch(function(e) {
            console.log(e);
          });    
    };

    $scope.saveOrEdit = function(form, patient) {
      if(patient._id) {
        editPatient(patient._id, patient);
      } else {
        savePatient(patient);
      }
    };

  	var savePatient = function(patient) {  		
        PatientService.save(patient)
            .then(function(data) {  
                console.log(data);
            })
            .catch(function(e) {
                console.log(e);
            });            
  	};

    var editPatient = function(id, patient) {      
        PatientService.update(id, patient)
            .then(function(data) {  
                console.log(data);
            })
            .catch(function(e) {
                console.log(e);
            });            
    };

  	init();

}]);