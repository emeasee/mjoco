angular.module('ng-wait-for-images', []).directive('ngWaitForImages', ['$timeout', function($timeout) {
  'use strict';
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      var callback;

      if (scope !== null && scope[attrs.ngWfiCallback] !== undefined) {
        callback = scope[attrs.ngWfiCallback];

      } else if (scope.$parent !== null && scope.$parent[attrs.ngWfiCallback] !== undefined) {
        callback = scope.$parent[attrs.ngWfiCallback];
      }

      $timeout(function() {
        element.imagesLoaded(function() {
          $(window).trigger('ngWaitForImages');

          element.removeClass('loading');

          scope.loaded = true;

          if (typeof(callback) === 'function') {
            callback();
          }
        });
      }, 1);
    }
  };
}]);
