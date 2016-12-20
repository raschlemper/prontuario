'use strict';

app.factory('ProfessionalHandler', [ function() {

	var create = function() {
		return {
			profession: null,
			company: null,
			dateStart: null,
			lastJob: null
		};
	};

	var to = function(professionalTo) {
		var professional = create();
		professional.profession = professionalTo.profession;
		professional.company = professionalTo.company;
		professional.dateStart = professionalTo.dateStart;
		professional.lastJob = professionalTo.lastJob;
		return professional;
	};

	var from = function(professionalFrom) {
		var professional = create();
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