'use strict';

angular.module('mjocoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngTouch',

  'btford.socket-io',
  'ui.router',
  'ui.directives',
  'ng-src',
  'ng-hardscroll',
  'ng-cycle',
  'angular-loading-bar',
  'anim-in-out',
  'LocalStorageModule'
])
  .config(['$stateProvider', '$logProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$provide', '$sceDelegateProvider', '$sceProvider',
    function($stateProvider, $logProvider, $locationProvider, $urlRouterProvider, $httpProvider, $provide, $sceDelegateProvider, $sceProvider) {

      $logProvider.debugEnabled(true);
      $locationProvider.html5Mode(true);

      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://*.vimeo.com/**'
      ]);

      $provide.decorator('ngSrcDirective', ['$delegate', '$sniffer',
        function($delegate, $sniffer) {
          var directive = $delegate[0].compile = function(element, attrs) {};
          return $delegate;
        }
      ]);

      $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path(),
          search = $location.search();
        if (path[path.length - 1] !== '/') {
          if ($.isEmptyObject(search)) {
            return path + '/';
          } else {
            var params = [];
            angular.forEach(search, function(v, k) {
              params.push(k + '=' + v);
            });
            return path + '/?' + params.join('&');
          }
        }
      });

      $urlRouterProvider.otherwise('/404/');

      $stateProvider.state('blank', {});
      $stateProvider.state('main', {});

    }]);
