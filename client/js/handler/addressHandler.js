'use strict';

app.factory('AddressHandler', [ function() {

	var patient = {
		zipCode: null,
		city: null,
		state: null,
		country: null,
		street: null,
		number: null,
		complement: null,
		district: null
	}

	var to = function(addressTo) {
		patient.zipCode = addressTo.zipCode;
		patient.city = addressTo.city;
		patient.state = addressTo.state;
		patient.country = addressTo.country;
		patient.street = addressTo.street;
		patient.number = addressTo.number;
		patient.complement = addressTo.complement;
		patient.district = addressTo.district;
		return patient;
	}

	var from = function(addressFrom) {
		patient.zipCode = addressFrom.zipCode;
		patient.city = addressFrom.city;
		patient.state = addressFrom.state;
		patient.country = addressFrom.country;
		patient.street = addressFrom.street;
		patient.number = addressFrom.number;
		patient.complement = addressFrom.complement;
		patient.district = addressFrom.district;
		return patient;
	}

	return {
		to: to,
		from: from
	}

}]);