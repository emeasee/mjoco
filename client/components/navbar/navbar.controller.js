'use strict';

angular.module('mjocoApp')
  .controller('NavbarCtrl', ['$rootScope', '$scope', '$location', '$log', '$window', 'localStorageService',
    function ($rootScope, $scope, $location, $log, $window, localStorageService) {

      $scope.date = new Date();
      $scope.link = '#';

      //todo: write a controller that outputs a bunch of phrases and helper text depending on the location of the browser
      console.log(document.location.pathname);
  }]);
