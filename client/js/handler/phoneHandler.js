'use strict';

app.factory('PhoneHandler', [ function() {

	var patient = {
		number: null,
  		type: null
	}

	var to = function(phoneTo) {
		patient.number = phoneTo.number;
		patient.type = phoneTo.type;
		return patient;
	}

	var from = function(phoneFrom) {
		patient.number = phoneFrom.number;
		patient.type = phoneFrom.type;
		return patient;
	}

	return {
		to: to,
		from: from
	}

}]);