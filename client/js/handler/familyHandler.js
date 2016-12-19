'use strict';

app.factory('FamilyHandler', [ 'LISTS', function(LISTS) {

  var maritalStatus = LISTS.maritalStatus;
  var educationLevels = LISTS.educationLevels;

	var family = {
		name: null, 
		age: null, 
		schooling: null, 
		maritalStatus: null,
		occupation: null,
		type: null 
	};

	var create = function(type) {		
    family.type = type;
		return family;
	};

	var to = function(familyTo) {
		family.name = familyTo.name;
		family.age = familyTo.age;
		family.schooling = familyTo.schooling && familyTo.schooling.id;
		family.maritalStatus = familyTo.maritalStatus && familyTo.maritalStatus.id;      
		family.occupation = familyTo.occupation;
		family.type = familyTo.type;
		return family;
	};

	var from = function(familyFrom) {
		family.name = familyFrom.name;
		family.age = familyFrom.age;
		family.schooling = educationLevels[familyFrom.schooling];
		family.maritalStatus = maritalStatus[familyFrom.maritalStatus];
		family.occupation = familyFrom.occupation;
		family.type = familyFrom.type;
		return family;
	};

	return {
		create: create,
		to: to,
		from: from
	};

}]);