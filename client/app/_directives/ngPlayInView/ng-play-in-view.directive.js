'use strict';


angular.module('ng-play-in-view', [])
  .directive('ngPlayInView', ['$log', '$timeout', '$window', '$document', '$interval', function($log, $timeout, $window, $document, $interval) {
    return {

      restrict: 'AC',
      link: function(scope, element, attrs) {

        var defaults = {
          scrollElement: '.project-wrap'
        };

        var options = angular.extend(defaults, scope.$eval(attrs.ngPlayInView));

        $log.debug('ngPlayInView',options);

        var windowHeight;
        var videoElement;
        var scrollElement;
        var resizeEvent;

        var init = function(){
          videoElement = angular.element(element[0]).find('video').get(0);

          scrollElement = angular.element($document).find(options.scrollElement);
          scrollElement.on('scroll', throttle(onScroll,250));

          resizeEvent = 'onorientationchange' in $window ? 'orientationchange' : 'resize';
          angular.element($window).on(resizeEvent, throttle(onResize,250));

          onResize();
          onScroll();
        };

        if(!Modernizr.touch){
          $timeout(init);
        }

        var play = function(){
          $log.debug('play-in-view','play');
          if(videoElement){
            videoElement.addEventListener("loadeddata", function() {
              videoElement.play();
            });
            videoElement.play();
          }
        };

        var pause = function(){
          if(videoElement){
            videoElement.pause();
          }
        };

        var onScroll = function(){
          var scroll = scrollElement.scrollTop();
          var top = element[0].offsetTop;
          var height = element[0].offsetHeight;
          var bottom = top + height;
          if((bottom > scroll && top < scroll + windowHeight) || height > windowHeight){
            play();
          } else {
            pause();
          }
          // $log.debug('onScroll',scroll,top,height,windowHeight);
        };

        var onResize = function(e) {
          windowHeight = angular.element($window).height();
        };

        scope.$on('$destroy', function() {
          if(!Modernizr.touch){
            scrollElement.off('scroll');
            angular.element($window).off(resizeEvent, onResize);
          }
        });

        function throttle(fn, threshhold) {
          var last,
            deferTimer;
          return function () {
            var context = this;
            var now = +new Date(),
              args = arguments;
            if (last && now < last + threshhold) {

              clearTimeout(deferTimer);
              deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
              }, threshhold);
            } else {
              last = now;
              fn.apply(context, args);
            }
          };
        }

      }
    };
  }
  ]);
