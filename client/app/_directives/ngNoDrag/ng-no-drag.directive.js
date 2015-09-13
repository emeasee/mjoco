angular.module('ng-no-drag', []).directive('ngNoDrag', [function() {
  'use strict';
  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {

      element.on('mousedown contextmenu', function(e){
        e.preventDefault();
        return false;
      });

    }
  };
}]);
