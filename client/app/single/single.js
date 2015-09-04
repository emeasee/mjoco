'use strict';

angular.module('mjocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('single', {
        url: '/single',
        templateUrl: 'app/single/single.html',
        controller: 'SingleCtrl'
      });
  });