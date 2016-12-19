'use strict';

app.factory('PhoneHandler', [ function() {

	var phone = {
		number: null,
  	type: null
	}

	var create = function(type) {		
    phone.type = type;
		return phone;
	}

	var to = function(phoneTo) {
		phone.number = phoneTo.number;
		phone.type = phoneTo.type;
		return phone;
	}

	var from = function(phoneFrom) {
		phone.number = phoneFrom.number;
		phone.type = phoneFrom.type;
		return phone;
	}

	return {
		create: create,
		to: to,
		from: from
	}

}]);