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
  'ng-wait-for-images',
  'ng-is-scrolled',
  'ng-no-drag',
  'ng-play-in-view',
  'angular-loading-bar',
  'anim-in-out',
  'LocalStorageModule'
])
  .config(['$stateProvider', '$logProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$provide', '$sceDelegateProvider', '$sceProvider', 'cfpLoadingBarProvider',
    function($stateProvider, $logProvider, $locationProvider, $urlRouterProvider, $httpProvider, $provide, $sceDelegateProvider, $sceProvider, cfpLoadingBarProvider) {

      $logProvider.debugEnabled(true);
      $locationProvider.html5Mode(true);

      cfpLoadingBarProvider.includeSpinner = false;

      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://s3-eu-west-1.amazonaws.com/mjoco/**',
        'https://*.vimeo.com/**'
      ]);

      $provide.decorator('ngSrcDirective', ['$delegate', '$sniffer',
        function($delegate, $sniffer) {
          var directive = $delegate[0].compile = function(element, attrs) {};
          return $delegate;
        }
      ]);

      $urlRouterProvider.otherwise('/404/');

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

      $stateProvider.state('blank', {});
      $stateProvider.state('main', {});

    }]);
