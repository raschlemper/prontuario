'use strict';

app.controller('PatientEditContactController', ['$scope',
  function ($scope) {

  var init = function () {
    $scope.setBreadcrumb('patientContact');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) { setContact(); }
    else {
      $scope.getPatient()
        .then(function(data) {
          setContact();
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }   
  }

  var setContact = function() {
    addEmail();
    addPhone();
  };

  var addEmail = function() {
    if($scope.patient.emails && $scope.patient.emails.length) return;
    $scope.patient.emails[0] = $scope.patient.emails[0] || null;
    $scope.patient.emails[1] = $scope.patient.emails[1] || null;
  };

  var addPhone = function() {
    if($scope.patient.phones && $scope.patient.phones.length) return;
    $scope.patient.phones[0] = createPhone('telephone');
    $scope.patient.phones[1] = createPhone('celular');
    $scope.patient.phones[2] = createPhone('celular');
  };

  var createPhone = function(type) {
    return { 
      'number': null,
      'type': type 
    };
  };

  init();

}]);