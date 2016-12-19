'use strict';

app.factory('PatientHandler', [ 'PhoneHandler', 'AddressHandler', 'FamilyHandler', 'GraduationHandler',
  'ProfessionalHandler', 'LISTS',
	function(PhoneHandler, AddressHandler, FamilyHandler, GraduationHandler, ProfessionalHandler, LISTS) {

	var genders = LISTS.genders;
  
	var patient = {
		name: null,
		birthDate: null,
		age: null,
		gender: getGender() || null,
		emails: getEmails() || [],
		phones: getPhones() || [],
		address: getAddress() || [],
		family: getFamily() || {},
		graduations: getGraduations() || [],
		professionals: getProfessionals() || []
	}

	var create = function() {
		return patient;
	}

	var to = function(patientTo) {
		patient.name = patientTo.name;
		patient.birthDate = patientTo.birthDate;
		patient.age = patientTo.age;
		patient.gender = patientTo.gender.selected || patientTo.gender.id;
		patient.emails = patientTo.emails;
		patient.phones = getPhones(patientTo.phones);
		patient.address = getAddress(patientTo.address);
		patient.family = getFamily(patientTo.family);
		return patient;
	}

	var from = function(patientFrom) {
		patient.name = patientFrom.name;
		patient.birthDate = patientFrom.birthDate;
		patient.age = patientFrom.age;
		patient.gender = genders[patientFrom.gender];
		patient.emails = patientFrom.emails;
		patient.phones = getPhonesFrom(patientFrom.phones);
		patient.address = getAddressFrom(patientFrom.address);
		patient.family = getFamilyFrom(patientFrom.family);
		return patient;
	};

	var getGender = function() {
		return genders[0];
	};

	var getEmails = function() {
		var emails = [];
		emails.push(null);
		emails.push(null);
		return emails;
	};

	var getPhones = function() {
		var phones = [];
		phones.push(PhoneHandler.create('telephone'));
		phones.push(PhoneHandler.create('celular'));
		phones.push(PhoneHandler.create('celular'));
		return phones;
	};

  var getAddress = function() {
		var address = [];
  	address.push(AddressHandler.create());
  	return address;
  };

	var getFamily = function() {
		var family = {};
		family.father = FamilyHandler.create('father'));
		family.mother = FamilyHandler.create('mother'));
		family.partner = FamilyHandler.create('partner'));
		family.sublings = [];
		family.children = [];
		return family;
	};

	var getGraduations = function() {
		var graduations = [];
		graduations.push(GraduationHandler.create('elementarySchool'));
		graduations.push(GraduationHandler.create('highSchool'));
		graduations.push(GraduationHandler.create('undergraduate'));
		return graduations;
	};

  var getProfessionals = function() {
		var professionals = [];
  	professionals.push(ProfessionalHandler.create());
  	return professionals;
  };

	var getPhonesTo = function(phones) {
		return phones.map(function(phone) {
			return PhoneHandler.to(phone);
		})
	};

	var getPhonesFrom = function(phones) {
		return phones.map(function(phone) {
			return PhoneHandler.from(phone);
		})
	};

	var getAddressTo = function(address) {
		return address.map(function(addr) {
			return AddressHandler.to(addr);
		})
	};

	var getAddressFrom = function(address) {
		return address.map(function(addr) {
			return AddressHandler.from(addr);
		})
	};

	var getFamilyTo = function(family) {
		return {
			father: FamilyHandler.to(family.father),
			mother: FamilyHandler.to(family.mother)
		}
	};

	var getFamilyFrom = function(family) {
		return {
			father: FamilyHandler.from(family.father),
			mother: FamilyHandler.from(family.mother)
		}
	};

	return {
		create: create,
		to: to,
		from: from
	};

}]);