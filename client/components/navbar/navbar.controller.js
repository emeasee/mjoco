'use strict';

angular.module('mjocoApp')
  .controller('NavbarCtrl', ['$rootScope', '$scope', '$location', '$log', '$window', 'localStorageService',
    function ($rootScope, $scope, $location, $log, $window, localStorageService) {

      $rootScope.voice.cover[0] = "<a href='#'>hello</a>";
      $rootScope.voice.cover[1] = "<a href='#'>you</a>";
      $rootScope.voice.cover[2] = "<a href='#'>are</a>";
      $rootScope.voice.cover[3] = "<a href='#'>looking</a>";
      $rootScope.voice.cover[4] = "<a href='#'>wonderful</a>";

      $rootScope.voice.projects[0] = "<a href='#'>projects</a>";
  }]);

