'use strict';

app.filter('btnEdit', function() {

    return function(input, events) {
        return '<button type="button" ng-click="' + events + '" class="btn btn-primary btn-sm">' +
                  '<em class="fa fa-pencil"></em>' +
               '</button>';

    };

});