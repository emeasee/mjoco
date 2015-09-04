'use strict';

angular.module('mjocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vitals', {
        url: '/vitals',
        templateUrl: 'app/vitals/vitals.html',
        controller: 'VitalsCtrl'
      });
  });