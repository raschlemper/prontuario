'use strict';

app.controller('PatientEditProfileController', ['$scope', '$state', '$stateParams', 'PatientService', 
  'FileService', 'ImageService', 'PatientHandler', 'NotifyService', 'LISTS',
  function ($scope, $state, $stateParams, PatientService, FileService, ImageService, PatientHandler, 
    NotifyService, LISTS) {

  $scope.genders = LISTS.genders;
  $scope.maritalStatus = LISTS.maritalStatus;
  $scope.educationLevels = LISTS.educationLevels;

  $scope.toolbar = {
    breadcrumb: [{ state: 'patient' }, { state: 'patientGeral' }],
    actions: {
      cancel: function() { goToList(); },
      save: function() { edit($scope.patient); }
    }
  };

 	var init = function () {
    getImage();
    getPatient();
 	};

  $scope.setBreadcrumb = function(breadcrumb) {
     $scope.toolbar.breadcrumb.pop();
     $scope.toolbar.breadcrumb.push({ state: breadcrumb });
  };  

  // GERAL /////  

  var setGeral = function() { 
  };

  $scope.openImageSelect = function(event) {
    event.preventDefault();
    angular.element("#imagePatient").trigger('click');
  };

  $scope.getImageSelected = function(file) { 
    if (file[0]) { ImageService.getUrlImage(file[0], onloadImage); }
  };

  var getImage = function() {
    if($stateParams.id) { getImagePatient($stateParams.id); }
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
  };

  // CONTACT /////  

  var setContact = function() {
    $scope.patient.emails = $scope.patient.emails || addEmail();
    $scope.patient.phones = $scope.patient.phones || addPhone();
  };

  var addEmail = function() {
    $scope.patient.emails = [];
    $scope.patient.emails[0] = null;
    $scope.patient.emails[1] = null;
  };

  var addPhone = function() {
    $scope.patient.phones = [];
    $scope.patient.phones[0] = PhoneHandler.create('telephone');
    $scope.patient.phones[1] = PhoneHandler.create('celular');
    $scope.patient.phones[2] = PhoneHandler.create('celular');
  };

  // ADDRESS /////  

  var setAddress = function() {
    $scope.patient.address = $scope.patient.address || addAddress(null);
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
      var address = {};
      address.zipCode = zipCode.cep;
      address.city = zipCode.cidade;
      address.state = zipCode.estado;
      address.street = zipCode.logradouro;
      address.district = zipCode.bairro;
      addAddress(address)
    } else {
      addAddress(null);        
    }
    $scope.patient.address[0].country = 'Brasil';
  };

  var addAddress = function(address) {
    if(!address) { address = AddressHandler.create(); }
    $scope.patient.address = [];
    $scope.patient.address.push(address);
  };

	// ACTION /////

  var getPatient = function() {  
    if(!$stateParams.id) return;
    return PatientService.get($stateParams.id)
      .then(function(data) {
        $scope.patient = patientToShowHandler(data); 
        setGeral();
        setContact();
        setAddress();
      })
      .catch(function(e) {
        console.log(e);
      });    
  };

  var edit = function(patient) {      
    var patientEdit = patientToSaveHandler(angular.copy(patient));    
    PatientService.update(patient.id, patientEdit)
      .then(function(data) {   
          uploadFilePatient(patient.id, patient.image);
          $scope.patient = patientToShowHandler(data); 
          NotifyService.success('Paciente alterado com sucesso!');
      })
      .catch(function(e) {
          NotifyService.error('Problemas ao alterar o paciente!');
      });            
  };

  var uploadFilePatient = function(name, file) { 
    if(!file || !file.length) { init(); } 
    else { uploadFile(name, file); }         
  };

  var uploadFile = function(name, file) { 
    FileService.savePatient(name, file[0])
      .then(function(data) {            
        init();
        NotifyService.success('Imagem inserida com sucesso!');
      })
      .catch(function(e) {
          NotifyService.error('Problemas ao inserir a imagem!');
      });            
  };

  var patientToSaveHandler = function(patient) {
    return PatientHandler.to(patient);
  }

  var patientToShowHandler = function(patient) {
    return PatientHandler.from(patient);
  }

  var goToList = function() {
    $state.go('app.patient.list');
  };

 	init();

}]);