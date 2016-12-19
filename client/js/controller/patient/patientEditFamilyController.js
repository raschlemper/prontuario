'use strict';

app.controller('PatientEditFamilyController', ['$scope', 'FamilyHandler', 'NotifyService',
  function ($scope, FamilyHandler, NotifyService) {

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
    $scope.patient.family.father = $scope.patient.family.father || FamilyHandler.create('father');    
    $scope.patient.family.mother = $scope.patient.family.mother || FamilyHandler.create('mother');  
    $scope.patient.family.partner = $scope.patient.family.partner || FamilyHandler.create('partner');
    $scope.patient.family.sublings = $scope.patient.family.sublings || [];
    $scope.patient.family.children = $scope.patient.family.children || [];
  };

  // SUBLING /////

  $scope.addSubling = function(sublingNew) {
    if(!validateSubling(sublingNew)) return;
    var subling = FamilyHandler.create('subling');
    subling.name = sublingNew.name;
    subling.age = sublingNew.age;
    $scope.sublingNew = {};
    $scope.patient.family.sublings.push(subling);
  };

  // TODO: Verificar se existe a necessidade de usar o edit
  $scope.editSubling = function(index, sublingEdit) {
    if(!validateSubling(sublingEdit)) return;
    var subling = $scope.patient.family.sublings[index];
    subling.name = sublingEdit.name;
    subling.age = sublingEdit.age;
  };

  $scope.removeSubling = function(index) {
    if(!index) return;    
    $scope.patient.family.sublings.splice(index, 1);
  };

  var validateSubling = function(subling) {
    if(!subling) {
      NotifyService.error('Preencha todos os campos.');
      return false;
    }
    if(!subling.name) {
      NotifyService.error('Preencha o campo nome.');
      return false;
    }
    if(!subling.age) {
      NotifyService.error('Preencha o campo idade.');
      return false;
    }
    return true;
  };

  // CHILDREN /////

  $scope.addChild = function(childNew) {
    if(!validateChild(sublingNew)) return;
    var child = FamilyHandler.create('subling');
    child.name = childNew.name;
    child.age = childNew.age;
    $scope.childNew = {};
    $scope.patient.family.children.push(child);
  };

  // TODO: Verificar se existe a necessidade de usar o edit
  $scope.editChild = function(index, sublingEdit) {
    if(!validateSubling(sublingEdit)) return;
    var subling = $scope.patient.family.children[index];
    subling.name = sublingEdit.name;
    subling.age = sublingEdit.age;
  };

  $scope.removeChild = function(index) {
    if(!index) return;    
    $scope.patient.family.children.splice(index, 1);
  };

  var validateChild = function(child) {
    if(!child) {
      NotifyService.error('Preencha todos os campos.');
      return false;
    }
    if(!child.name) {
      NotifyService.error('Preencha o campo nome.');
      return false;
    }
    if(!child.age) {
      NotifyService.error('Preencha o campo idade.');
      return false;
    }
    return true;
  };

  init();

}]);