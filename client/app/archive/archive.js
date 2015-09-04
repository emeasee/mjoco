'use strict';

angular.module('mjocoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('archive', {
        url: '/archive',
        templateUrl: 'app/archive/archive.html',
        controller: 'ArchiveCtrl'
      });
  });