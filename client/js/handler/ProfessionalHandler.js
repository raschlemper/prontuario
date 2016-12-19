'use strict';

app.factory('ProfessionalHandler', [ function() {

	var professional = {
		profession: null,
		company: null,
		dateStart: null,
		lastJob: null
	};

	var create = function() {
		return professional;
	};

	var to = function(professionalTo) {
		professional.profession = professionalTo.profession;
		professional.company = professionalTo.company;
		professional.dateStart = professionalTo.dateStart;
		professional.lastJob = professionalTo.lastJob;
		return professional;
	};

	var from = function(professionalFrom) {
		professional.zipCode = professionalFrom.profession;
		professional.city = professionalFrom.company;
		professional.state = professionalFrom.dateStart;
		professional.country = professionalFrom.lastJob;
		return professional;
	};

	return {
		create: create,
		to: to,
		from: from
	};

}]);