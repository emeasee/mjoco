'use strict';

angular.module('ng-is-scrolled', [])
  .directive('ngIsScrolled', function($log, $window) {
    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {

        element.bind("scroll", function() {

          var height = element.children().height() - $(window).height();
          var scroll = element.scrollTop();

          if (scroll > 1) {
            element.addClass('scrolled');
          } else {
            element.removeClass('scrolled');
          }
          if (height - scroll < 30) {
            element.addClass('scroll-end');
          } else {
            element.removeClass('scroll-end');
          }

        });

      }
    };
  });
