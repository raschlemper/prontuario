'use strict';

app.factory('GraduationHandler', [ function() {

	var graduation = {
		school: null,
  		type: null
	}

	var create = function(type) {		
    	graduation.type = type;
		return graduation;
	}

	var to = function(graduationTo) {
		graduation.school = graduationTo.school;
		graduation.type = graduationTo.type;
		return graduation;
	}

	var from = function(graduationFrom) {
		graduation.school = graduationFrom.school;
		graduation.type = graduationFrom.type;
		return graduation;
	}

	return {
		create: create,
		to: to,
		from: from
	}

}]);