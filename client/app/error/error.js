'use strict';

angular.module('mjocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('error', {
        url: '/error',
        templateUrl: 'app/error/error.html',
        controller: 'ErrorCtrl'
      });
  });