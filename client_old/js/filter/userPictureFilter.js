'use strict';

app.filter('userPicture', function() {
    return function(input) {
        if(!input) return input;
        return '<div class="media">' +
               		'<img src="' + input + '" alt="Image" class="img-responsive img-circle">' +
               '</div>';       
    };
});