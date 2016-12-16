'use strict';

app.controller('PatientEditFamilyController', ['$scope',
  function ($scope) {

  var init = function () {
    $scope.setBreadcrumb('patientFamily');
    getPatient();
 	};

  var getPatient = function() {
    if($scope.patient) { setFamily(); }
    else {
      $scope.getPatient()
        .then(function(data) {
          setFamily();
        })
        .catch(function(e) {
          console.log(e);
        }); 
    }   
  };

  var setFamily = function() {
    $scope.patient.family = $scope.patient.family || {};
    $scope.patient.family.sublings = $scope.patient.family.sublings || [];
    $scope.patient.family.children = $scope.patient.family.children || [];
    addFather();
    addMother();
    addPartner();
  };

  var addFather = function() {
    if(!$scope.patient.family.father) return;
    $scope.patient.family.father = 
        createFamily('father', angular.copy($scope.educationLevels[0]), null);
  };

  var addMother = function() {
    if(!$scope.patient.family.mother) return;
    $scope.patient.family.mother = 
        createFamily('mother', angular.copy($scope.educationLevels[0]), null);
  };

  var addPartner = function() {
    if(!$scope.patient.family.partner) return;
    $scope.patient.family.partner = 
        createFamily('partner', angular.copy($scope.educationLevels[0]), angular.copy($scope.maritalStatus[0]));
  };

  $scope.addSubling = function(sublingNew) {
    if(!sublingNew || !sublingNew.name || !sublingNew.age) return;
    var subling = createFamily('subling', null, null);
    subling.name = sublingNew.name;
    subling.age = sublingNew.age;
    $scope.sublingNew = {};
    $scope.patient.family.sublings.push(subling);
  };

  $scope.removeSubling = function(sublingNew) {
    // if(!sublingNew || !sublingNew.name || !sublingNew.age) return;
    // var subling = createFamily('subling', null, null);
    // subling.name = sublingNew.name;
    // subling.age = sublingNew.age;
    // $scope.sublingNew = {};
    // $scope.patient.family.sublings.push(subling);
  };

  $scope.addChild = function(childNew) {
    if(!childNew || !childNew.name || !childNew.age) return;
    var child = createFamily('subling', null, null);
    child.name = childNew.name;
    child.age = childNew.age;
    $scope.childNew = {};
    $scope.patient.family.children.push(child);
  };

  var createFamily = function(type, schooling, maritalStatus) {
    return { 
      'name': null, 
      'age': null, 
      'schooling': schooling, 
      'maritalStatus': maritalStatus,
      'type': type 
    };
  };

  init();

}]);