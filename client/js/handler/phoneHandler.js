'use strict';

app.factory('PhoneHandler', [ function() {

	var create = function(type) {	
		return {
			number: null,
	  		type: type || null
		};
	}

	var to = function(phoneTo) {
		var phone = create();
		phone.number = phoneTo.number;
		phone.type = phoneTo.type;
		return phone;
	}

	var from = function(phoneFrom) {
		var phone = create();
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