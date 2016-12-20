'use strict';

app.factory('PatientHandler', [ 'PhoneHandler', 'AddressHandler', 'FamilyHandler', 'GraduationHandler',
  'ProfessionalHandler', 'LISTS',
	function(PhoneHandler, AddressHandler, FamilyHandler, GraduationHandler, ProfessionalHandler, LISTS) {

	var genders = LISTS.genders;
	var maritalStatus = LISTS.maritalStatus;

	var create = function() {
		return {
			id: null,
			name: null,
			birthDate: null,
			age: null,
			gender: getGender() || null,			
  		maritalStatus: getMaritalStatus() || null,
			emails: getEmails() || [],
			phones: getPhones() || [],
			address: getAddress() || [],
			family: getFamily() || {},
			graduations: getGraduations() || [],
			professionals: getProfessionals() || []
		};
	}

	var to = function(patientTo) {
		var patient = create();
		if(!patientTo) return patient;
		patient._id = patientTo.id;
		patient.name = patientTo.name;
		patient.birthDate = patientTo.birthDate;
		patient.age = patientTo.age;
		patient.gender = patientTo.gender.id;
		patient.maritalStatus = patientTo.maritalStatus.id;
		patient.emails = patientTo.emails;
		patient.phones = getPhonesTo(patientTo.phones);
		patient.address = getAddressTo(patientTo.address);
		patient.family = getFamilyTo(patientTo.family);
		patient.graduations = getGraduationsTo(patientTo.graduations);
		patient.professionals = getProfessionalsTo(patientTo.professionals);
		return patient;
	}

	var from = function(patientFrom) {
		var patient = create();
		if(!patientFrom) return patient;
		patient.id = patientFrom._id;
		patient.name = patientFrom.name;
		patient.birthDate = moment(patientFrom.birthDate).toDate();
		patient.age = patientFrom.age;
		patient.gender = getGender(patientFrom.gender);
		patient.maritalStatus = getMaritalStatus(patientFrom.maritalStatus);
		patient.emails = patientFrom.emails;
		patient.phones = getPhonesFrom(patientFrom.phones);
		patient.address = getAddressFrom(patientFrom.address);
		patient.family = getFamilyFrom(patientFrom.family);
		patient.graduations = getGraduationsFrom(patientFrom.graduations);
		patient.professionals = getProfessionalsFrom(patientFrom.professionals);
		return patient;
	};

	// GERAL /////

	var getGender = function(gender) {
		if(!gender)	return genders[0];
		return genders[gender];
	};

	var getMaritalStatus = function(status) {
		if(!status)	return maritalStatus[0];
		return maritalStatus[status];
	};

	// EMAIL /////

	var getEmails = function() {
		var emails = [];
		emails.push(null);
		emails.push(null);
		return emails;
	};

	// PHONE /////

	var getPhones = function() {
		var phones = [];
		phones.push(PhoneHandler.create('telephone'));
		phones.push(PhoneHandler.create('celular'));
		phones.push(PhoneHandler.create('celular'));
		return phones;
	};

	var getPhonesTo = function(phones) {
		if(!phones || !phones.length) return getPhones();
		return phones.map(function(phone) {
			return PhoneHandler.to(phone);
		})
	};

	var getPhonesFrom = function(phones) {
		if(!phones || !phones.length) return getPhones();
		return phones.map(function(phone) {
			return PhoneHandler.from(phone);
		})
	};

	// ADDRESS /////

  var getAddress = function() {
		var address = [];
  	address.push(AddressHandler.create());
  	return address;
  };

	var getAddressTo = function(address) {
		if(!address || !address.length) return getAddress();
		return address.map(function(addr) {
			return AddressHandler.to(addr);
		});
	};

	var getAddressFrom = function(address) {
		if(!address || !address.length) return getAddress();
		return address.map(function(addr) {
			return AddressHandler.from(addr);
		});
	};

	// FAMILY /////

	var getFamily = function() {
		var family = {};
		family.father = FamilyHandler.create('father');
		family.mother = FamilyHandler.create('mother');
		family.partner = FamilyHandler.create('partner');
		family.sublings = [];
		family.children = [];
		return family;
	};

	var getFamilyTo = function(family) {
		return {
			father: FamilyHandler.to(family.father),
			mother: FamilyHandler.to(family.mother),
			partner: FamilyHandler.to(family.partner),
			sublings: getSublingsTo(family.sublings),
			children: getChildrenTo(family.children)
		}
	};

	var getSublingsTo = function(sublings) {	
		if(!sublings || !sublings.length) return [];		
		return sublings.map(function(subling) {
			return FamilyHandler.to(subling);
		})
	};

	var getChildrenTo = function(children) {	
		if(!children || !children.length) return [];		
		return children.map(function(child) {
			return FamilyHandler.to(child);
		})
	};

	var getFamilyFrom = function(family) {
		return {
			father: FamilyHandler.from(family.father),
			mother: FamilyHandler.from(family.mother),
			partner: FamilyHandler.from(family.partner),
			sublings: getSublingsFrom(family.sublings),
			children: getChildrenFrom(family.children)
		}
	};

	var getSublingsFrom = function(sublings) {	
		if(!sublings || !sublings.length) return [];	
		return sublings.map(function(subling) {
			return FamilyHandler.from(subling);
		})
	};

	var getChildrenFrom = function(children) {	
		if(!children || !children.length) return [];	
		return children.map(function(child) {
			return FamilyHandler.from(child);
		})
	};

	// GRADUATION /////

	var getGraduations = function() {
		var graduations = [];
		graduations.push(GraduationHandler.create('elementarySchool'));
		graduations.push(GraduationHandler.create('highSchool'));
		graduations.push(GraduationHandler.create('undergraduate'));
		return graduations;
	};

	var getGraduationsTo = function(graduations) {
		if(!graduations || !graduations.length) return getGraduations();
		return graduations.map(function(graduation) {
			return GraduationHandler.to(graduation);
		})
	};

	var getGraduationsFrom = function(graduations) {
		if(!graduations || !graduations.length) return getGraduations();
		return graduations.map(function(graduation) {
			return GraduationHandler.from(graduation);
		})
	};

	// PROFESSIONAL /////

  var getProfessionals = function() {
		var professionals = [];
  	professionals.push(ProfessionalHandler.create());
  	return professionals;
  };

	var getProfessionalsTo = function(professionals) {
		if(!professionals || !professionals.length) return getProfessionals();
		return professionals.map(function(professional) {
			return ProfessionalHandler.to(professional);
		})
	};

	var getProfessionalsFrom = function(professionals) {
		if(!professionals || !professionals.length) return getProfessionals();
		return professionals.map(function(professional) {
			return ProfessionalHandler.from(professional);
		})
	};

	return {
		create: create,
		to: to,
		from: from
	};

}]);