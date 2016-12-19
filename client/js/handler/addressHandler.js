'use strict';

app.factory('AddressHandler', [ function() {

	var address = {
		zipCode: null,
		city: null,
		state: null,
		country: null,
		street: null,
		number: null,
		complement: null,
		district: null
	}

	var create = function() {
		return address;
	}

	var to = function(addressTo) {
		address.zipCode = addressTo.zipCode;
		address.city = addressTo.city;
		address.state = addressTo.state;
		address.country = addressTo.country;
		address.street = addressTo.street;
		address.number = addressTo.number;
		address.complement = addressTo.complement;
		address.district = addressTo.district;
		return address;
	}

	var from = function(addressFrom) {
		address.zipCode = addressFrom.zipCode;
		address.city = addressFrom.city;
		address.state = addressFrom.state;
		address.country = addressFrom.country;
		address.street = addressFrom.street;
		address.number = addressFrom.number;
		address.complement = addressFrom.complement;
		address.district = addressFrom.district;
		return address;
	}

	return {
		create: create,
		to: to,
		from: from
	}

}]);