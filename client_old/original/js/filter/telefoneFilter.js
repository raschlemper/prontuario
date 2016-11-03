'use strict';

app.filter('telefone', function() {

	var eightDigits = function(input) {
        if(input.length != 10) return input;
        return '(' + input.substring(0, 2) + ') ' + input.substring(2, 6) + '-' + input.substring(6, input.length);		
	}

	var nineDigits = function(input) {
        if(input.length != 11) return input;
        return '(' + input.substring(0, 2) + ') ' + input.substring(2, 7) + '-' + input.substring(7, input.length);		
	}

    return function(input) {
        if(!input) return input;
        input = eightDigits(input);
        input = nineDigits(input);
        return input;
    };

});