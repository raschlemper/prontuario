'use strict';

app.controller('PatientEditAddressController', ['$scope',
  function ($scope) {

  var init = function () {
    $scope.setBreadcrumb('patientAddress');
    getPatient();
 	};

  var getPatient = function() {
    $scope.getPatient();
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

  init();

}]);