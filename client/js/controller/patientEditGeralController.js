   'use strict';

   app.controller('PatientEditGeralController', ['$scope', '$stateParams', 'FileService', 'ImageService',
   function ($scope, $stateParams, FileService, ImageService) {

    var init = function () {
      $scope.setBreadcrumb('patientGeral');
      getPatient();
   	};

    var getPatient = function() {
      if(!$scope.image) { getImage(); }
      if($scope.patient) { setGeral(); }
      else {
        $scope.getPatient()
          .then(function(data) {
            setGeral();
          })
          .catch(function(e) {
            console.log(e);
          });    
      }
    }

    var setGeral = function() {
      $scope.patient.gender = $scope.patient.gender || angular.copy($scope.genders[0]); 
      $scope.patient.gender.selected = $scope.patient.gender.id;      
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
    }

    init();

   }]);