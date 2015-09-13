angular.module('ng-src-error', []).directive('ngSrcError', ['$timeout',
  function($timeout) {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
        element.one('error', function() {
          var src = attrs.src;

          element.unbind('error');
          element.one('error', function() {

            element[0].classList.add('image-caching');
            attrs.$set('src', 'data:image/gif;base64,R0lGODlhHgAeAJEDAKqqqn9/f5aWlgAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAAADACwAAAAAHgAeAAACT5yPBwvpn4KcNMBbM71I+8kN32hBJPmcp6OuR+sasDvT9SjfnwDoe+/T8IJCIJEiEB2RyqUk5yxFn9BjxxmxsoIYH+cWqsbCzQ8ZIkirwwUAIfkECQAAAwAsAAAAAB4AHgAAAkicj6nL7Q/jE7RKFrLe4RoOaldIdlBZPijqrOzivkosHwKdJjceKjvP8QFBwuGmaMzAksoZE/OEDlVTKk5yHa08CBL3Cw6LFQUAIfkECQAAAwAsAAAAAB4AHgAAAkCcj6nL7Q+jnLTaO4LeGvO/VeAYTCQpneijrk47QjAIsDNXv/eWNztv+8l+peEuIkzNRK2LCnMASHvQqvWKzV4KACH5BAkAAAMALAAAAAAeAB4AAAI7nI+py+0Po5y02oslABmFD35ZSAZXWVYoSq3p5JITEIdcRNffHeki7GsFhbGTa8TqGDbKpvMJjUqnkAIAIfkECQAAAwAsAAAAAB4AHgAAAjacj6nL7Q+jnLTai7PeDABuBOK4jaaInWeqjoIFtC4si69VB3eVZ7Xf4giGO5DxiEwql8zmpQAAIfkEBQAAAwAsAAAAAB4AHgAAAiucj6nL7Q+jnLTai7PevF8AeMFIcuSpAWeZqWuwvbD2dqiH5/rO9/4PDA4KACH5BAUAAAMALAkACQAMAAwAAAIdnA1wO+HPnnRmzmqfAFnzHggNKILBAaIZMwiueBQAIfkEBQAAAwAsBwAHABAAEAAAAiScPwDIFg9fG7EGZu3J2fHqfVAiRkoJLahErWG5wYg4cROiTAUAIfkEBQAAAwAsBgAGABMAEwAAAiucHal5jQuZizS0Wg/Om/c4fBEgQmSpnGigouFqva4sXvXUORqm68AP6A0KACH5BAUAAAMALAMAAwAYABgAAAI7nH+ii+0TopzhIYqlhbm/DlZXCI6kx52oGgos6L5ZLFN0Ld14oOPpXgFGDELRT9bYOWqW1+aYeZoolgIAOw==');
            //
            $.post(
              scope.app.imagecacheWorker,
              { slug: scope.app.slug, bucket: scope.app.bucketName, req: src.replace(scope.app.bucketPath + 'cache/', '') },
              function(){

                setTimeout(function(){

                  var count = 0; // use to stop polling after n times
                  var interval = setInterval(function(){

                    if(++count === 10){
                      clearInterval(interval);
                    }

                    //polling
                    var new_src = src + '?'+Date.now();

                    $.get(new_src, function(){
                      //image has been processed successfully
                      clearInterval(interval);
                      attrs.$set('src', new_src);
                      element[0].classList.remove('image-caching');
                    });

                  }, 2000); // try to get the new image every 3s

                }, 5000); // waiting 5s before polling
              }
            );

          });

          attrs.$set('src', src + '?'+Date.now());

        });

      }
    };
  }
]);
