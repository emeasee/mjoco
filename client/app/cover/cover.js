'use strict';

angular.module('mjocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cover', {
        url: '/',
        templateUrl: 'app/cover/cover.html',
        controller: 'CoverCtrl'
      });
  });