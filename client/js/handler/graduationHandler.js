'use strict';

app.factory('GraduationHandler', [ function() {

	var create = function(type) {	
		return {
			school: null,
	  		type: type || null
		};
	}

	var to = function(graduationTo) {
		var graduation = create();
		if(!graduationTo) return graduation;
		graduation.school = graduationTo.school;
		graduation.type = graduationTo.type;
		return graduation;
	}

	var from = function(graduationFrom) {
		var graduation = create();
		if(!graduationFrom) return graduation;
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