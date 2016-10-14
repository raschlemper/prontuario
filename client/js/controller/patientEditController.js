   'use strict';

   app.controller('PatientEditController', ['$scope', '$state', '$stateParams', 'PatientService', 'FileService', 'ImageService', 'CepService', 'NotifyService',
   function ($scope, $state, $stateParams, PatientService, FileService, ImageService, CepService, NotifyService) {

      $scope.genders = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
    	$scope.maritalStatus = [{ id: 0, label: 'Solteiro(a)' }, { id: 1, label: 'Cadsado(a)' }, 
    	                        { id: 2, label: 'Divorciado(a)' }, { id: 3, label: 'Viúvo(a)' }];
    	$scope.educationLevels = [{ id: 0, label: '1º grau incompleto' }, 
    	                          { id: 1, label: '1º grau completo' }, 
    	                          { id: 2, label: '2º grau incompleto' }, 
    	                          { id: 3, label: '2º grau completo' }, 
                                { id: 4, label: '3º grau incompleto' }, 
    	                          { id: 5, label: '3º grau completo' }];

      $scope.toolbar = {
         breadcrumb: [{ state: 'patient' }, { state: 'patientGeral' }],
         actions: {
            cancel: function() { goToList(); },
            save: function() { saveOrEdit(); }
         }
      };
	
   	var init = function () {
   		$scope.menu = $stateParams.menu;
   		$scope.patient = $stateParams.patient || {}; 
         if($stateParams.id) {
            getPatient($stateParams.id);
            getImage($stateParams.id);         
         } else {
            initFactory($scope.menu);
            getImage();
         }
         //TODO: Fazer a pesquisa do paciente antes do init ???
   	};

    	$scope.setMenu = function(menu) {
    		$scope.menu = menu;
    		$state.go("app.patient.edit", {menu: menu, id: $stateParams.id, patient: $scope.patient});
    	};

      var setBreadcrumb = function(breadcrumb) {
         $scope.toolbar.breadcrumb.pop();
         $scope.toolbar.breadcrumb.push({ state: breadcrumb });
      };

      $scope.templateUrl = function() {
         switch($scope.menu) {
            case 'geral': return 'partials/app/patient/patient-edit-geral.html'; break;
            case 'contact': return 'partials/app/patient/patient-edit-contact.html'; break;
            case 'address': return 'partials/app/patient/patient-edit-address.html'; break;
            case 'family': return 'partials/app/patient/patient-edit-family.html'; break;
            case 'graduation': return 'partials/app/patient/patient-edit-graduation.html'; break;
            case 'professional': return 'partials/app/patient/patient-edit-professional.html'; break;
            default: return 'partials/app/patient/patient-edit-geral.html';
         }      
      }

    	var initFactory = function(menu) {
    		switch(menu) {
   		   case 'geral': initGeral(menu, 'patientGeral'); break;
   		   case 'contact': initContact(menu, 'patientContact'); break;
   		   case 'address': initAddress(menu, 'patientAddress'); break;
   		   case 'family': initFamily(menu, 'patientFamily'); break;
   		   case 'graduation': initGraduation(menu, 'patientGraduation'); break;
   		   case 'professional': initProfessional(menu, 'patientProfessional'); break;
   		   default: initGeral();
   		}
    	};

      var getLastIndex = function(list) {
         return list.length - 1;
      };

    	// GERAL /////

    	var initGeral = function (menu) { 
        $scope.label = 'Dados Paciente';
        setBreadcrumb('patientGeral');
        $scope.patient.gender = $scope.patient.gender || angular.copy($scope.genders[0]); 
        $scope.patient.gender.selected = $scope.patient.gender.id;
      };

    	// CONTACT /////

    	var initContact = function (menu) { 
        $scope.label = 'Contato';
        setBreadcrumb('patientContact');
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

    	var initAddress = function (menu) { 
   		 $scope.label = 'Endereço';
       setBreadcrumb('patientAddress');
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

    	var initFamily = function (menu) { 
   		$scope.label = 'Familiar';
      setBreadcrumb('patientFamily');
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

    	var initGraduation = function (menu) {
   		$scope.label = 'Escolaridade';
      setBreadcrumb('patientGraduation');
   	};

    	// PROFESSIONAL /////

    	var initProfessional = function (menu) { 
   		$scope.label = 'Profissional';
      setBreadcrumb('patientProfessional');
   	};

    	// ACTION /////

      var getPatient = function(id) {  
        if(!id) return;
        PatientService.get(id)
            .then(function(data) {
              $scope.patient = patientToShowHandler(data);              
              initFactory($scope.menu);
            })
            .catch(function(e) {
              console.log(e);
            });    
      };

      var saveOrEdit = function() {      
        var patient = patientToSaveHandler($scope.patient);
        if(patient._id) {
          editPatient(patient._id, patient);
        } else {
          savePatient(patient);
        }
      };

    	var savePatient = function(patient) {  		
          PatientService.save(patient)
              .then(function(data) {   
                  uploadFilePatient(data._id, $scope.patient.image);
                  $scope.patient = patientToShowHandler(data); 
                  NotifyService.success('Paciente inserido com sucesso!');
              })
              .catch(function(e) {
                  NotifyService.error('Problemas ao inserir o paciente!');
              });            
    	};

      var editPatient = function(id, patient) {      
          PatientService.update(id, patient)
              .then(function(data) {   
                  uploadFilePatient(id, $scope.patient.image);
                  $scope.patient = patientToShowHandler(data); 
                  NotifyService.success('Paciente alterado com sucesso!');
              })
              .catch(function(e) {
                  NotifyService.error('Problemas ao alterar o paciente!');
              });            
      };

      var uploadFilePatient = function(name, file) { 
          if(!file || !file.length) { 
              initFactory($scope.menu);
          } else {
              uploadFile(name, file);
          }         
      };

      var uploadFile = function(name, file) { 
          FileService.savePatient(name, file[0])
              .then(function(data) {            
                  initFactory($scope.menu);
                  NotifyService.success('Imagem inserida com sucesso!');
              })
              .catch(function(e) {
                  NotifyService.error('Problemas ao inserir a imagem!');
              });            
      };

      $scope.openImageSelect = function(event) {
          event.preventDefault();
          angular.element("#imagePatient").trigger('click');
      };

      $scope.getImageSelected = function(file) { 
        if (file[0]) { ImageService.getUrlImage(file[0], onloadImage); }
      };

      var getImage = function(id) {
        if(id) { getImagePatient(id); }
        else { getImageDefault(); }
      };

      var getImageDefault = function() {
        getImageFromServer('patient');
      };

      var getImagePatient = function(id) {
        getImageFromServer(id);
      };

      var getImageFromServer = function(name) {
          FileService.findPatient(name)
              .then(function(data) {  
                  ImageService.getUrlImage(ImageService.imageToBlob(data), onloadImage);
              })
              .catch(function(e) {
                  console.log(e);
              }); 
      };

      var onloadImage = function(event) {
          $scope.image = { source: event.target.result }
          $scope.$apply();
      }

      var patientToSaveHandler = function(patient) {
        patient.gender = $scope.patient.gender.selected;
        return patient;
      }

      var patientToShowHandler = function(patient) {
        patient.gender = $scope.genders[patient.gender];
        patient.birthDate = moment(patient.birthDate).toDate()
        return patient;
      }

      var goToEdit = function() {
        $state.go('app.patient.list');
      };

      // $scope.$watchCollection('anexoFile', function(newValue, oldValue) {
      //   if(!newValue) return;
      //   getImage(newValue);
      // });

       	init();

   }]);