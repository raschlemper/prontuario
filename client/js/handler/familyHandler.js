'use strict';

app.factory('FamilyHandler', [ function() {

  var maritalStatus = [{ id: 0, label: 'Solteiro(a)' }, { id: 1, label: 'Cadsado(a)' }, 
                          { id: 2, label: 'Divorciado(a)' }, { id: 3, label: 'Viúvo(a)' }];
  var educationLevels = [{ id: 0, label: '1º grau incompleto' }, 
                            { id: 1, label: '1º grau completo' }, 
                            { id: 2, label: '2º grau incompleto' }, 
                            { id: 3, label: '2º grau completo' }, 
                            { id: 4, label: '3º grau incompleto' }, 
                            { id: 5, label: '3º grau completo' }];

	var patient = {
		name: null, 
		age: null, 
		schooling: null, 
		maritalStatus: null,
		occupation: null,
		type: null 
	}

	var to = function(familyTo) {
		patient.name = familyTo.name;
		patient.age = familyTo.age;
		patient.schooling = familyTo.schooling && familyTo.schooling.id;
		patient.maritalStatus = familyTo.maritalStatus && familyTo.maritalStatus.id;      
		patient.occupation = familyTo.occupation;
		patient.type = familyTo.type;
		return patient;
	}

	var from = function(familyFrom) {
		patient.name = familyFrom.name;
		patient.age = familyFrom.age;
		patient.schooling = educationLevels[familyFrom.schooling];
		patient.maritalStatus = maritalStatus[familyFrom.maritalStatus];
		patient.occupation = familyFrom.occupation;
		patient.type = familyFrom.type;
		return patient;
	}

	return {
		to: to,
		from: from
	}

}]);