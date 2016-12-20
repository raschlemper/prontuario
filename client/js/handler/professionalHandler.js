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
		if(!professionalTo) return professional;
		professional.profession = professionalTo.profession;
		professional.company = professionalTo.company;
		professional.dateStart = professionalTo.dateStart;
		professional.lastJob = professionalTo.lastJob;
		return professional;
	};

	var from = function(professionalFrom) {
		var professional = create();
		if(!professionalFrom) return professional;
		professional.profession = professionalFrom.profession;
		professional.company = professionalFrom.company;
		professional.dateStart = moment(professionalFrom.dateStart).toDate();
		professional.lastJob = professionalFrom.lastJob;
		return professional;
	};

	return {
		create: create,
		to: to,
		from: from
	};

}]);