'use strict';

app.factory('FamilyHandler', [ 'LISTS', function(LISTS) {

  var maritalStatus = LISTS.maritalStatus;
  var educationLevels = LISTS.educationLevels;

	var create = function(type) {		
		return {
			name: null, 
			age: null, 
			schooling: null, 
			maritalStatus: null,
			occupation: null,
			type: type || null 
		};
	};

	var to = function(familyTo) {
		var family = create();
		family.name = familyTo.name;
		family.age = familyTo.age;
		family.schooling = familyTo.schooling && familyTo.schooling.id;
		family.maritalStatus = familyTo.maritalStatus && familyTo.maritalStatus.id;      
		family.occupation = familyTo.occupation;
		family.type = familyTo.type;
		return family;
	};

	var from = function(familyFrom) {
		var family = create();
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