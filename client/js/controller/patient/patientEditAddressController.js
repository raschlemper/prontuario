'use strict';

app.controller('PatientEditAddressController', ['$scope', 'CepService',
  function ($scope, CepService) {

  var init = function () {
    $scope.setBreadcrumb('patientAddress');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) { setAddress(); }
    else {
      $scope.getPatient()
        .then(function(data) {
          setAddress();
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }   
  };

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

  init();

}]);