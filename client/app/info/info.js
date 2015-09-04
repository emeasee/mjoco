'use strict';

angular.module('mjocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('info', {
        url: '/info',
        templateUrl: 'app/info/info.html',
        controller: 'InfoCtrl'
      });
  });