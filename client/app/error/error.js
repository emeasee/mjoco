'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('main.error', {
      url: '/404/',
      views: {
        'article@': {
          templateUrl: 'app/error/error.html',
          controller: 'ErrorCtrl'
        }
      }
    });
  }]);
