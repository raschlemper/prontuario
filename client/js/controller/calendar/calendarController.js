'use strict';

app.controller('CalendarController', ['$scope',
  function ($scope) {

	var init = function () {
		$scope.calendarView = 'month';
		$scope.viewDate = new Date();
	};

  	init();

}]);