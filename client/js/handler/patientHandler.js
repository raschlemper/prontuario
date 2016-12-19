'use strict';

app.factory('PatientHandler', [ 'PhoneHandler', 'AddressHandler', 'FamilyHandler',
	function(PhoneHandler, AddressHandler, FamilyHandler) {

	var genders = [{ id: 0, label: 'Masculino' }, { id: 1, label: 'Feminino' }];
  
	var patient = {
		name: null,
  		birthDate: null,
  		age: null,
  		gender: null,
  		emails: [],
  		phones: [],
  		address: [],
  		family: {
  			father: null,
  			mother: null
  		}
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
	}

	var getPhonesTo = function(phones) {
		return phones.map(function(phone) {
			return PhoneHandler.to(phone);
		})
	}

	var getPhonesFrom = function(phones) {
		return phones.map(function(phone) {
			return PhoneHandler.from(phone);
		})
	}

	var getAddressTo = function(address) {
		return address.map(function(addr) {
			return AddressHandler.to(addr);
		})
	}

	var getAddressFrom = function(address) {
		return address.map(function(addr) {
			return AddressHandler.from(addr);
		})
	}

	var getFamilyTo = function(family) {
		return {
			father: FamilyHandler.to(family.father),
			mother: FamilyHandler.to(family.mother)
		}
	}

	var getFamilyFrom = function(family) {
		return {
			father: FamilyHandler.from(family.father),
			mother: FamilyHandler.from(family.mother)
		}
	}

	return {
		to: to,
		from: from
	}

}]);