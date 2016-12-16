'use strict';

app.directive('noScrollTab', [function () {
	
  return function(scope, element, attrs) {
    element.click(function(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			$(this).tab('show');
		});
  };
    
}]);
