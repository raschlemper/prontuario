   'use strict';

   app.controller('PatientEditGeralController', ['$scope', '$state', '$stateParams', 'PatientService', 'FileService', 'ImageService', 'CepService', 'NotifyService',
   function ($scope, $state, $stateParams, PatientService, FileService, ImageService, CepService, NotifyService) {

    $scope.genders = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
	
   	var init = function () {
   		$scope.patient = {}; 
      if($stateParams.id) {
        getPatient($stateParams.id);
        getImage($stateParams.id);         
      } else {
        initGeral($scope.menu, 'patientGeral');
        getImage();
      }

   	};

  	var initGeral = function (menu) { 
      setBreadcrumb('patientGeral');
      $scope.patient.gender = $scope.patient.gender || angular.copy($scope.genders[0]); 
      $scope.patient.gender.selected = $scope.patient.gender.id;
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