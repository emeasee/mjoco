'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('main.information', {
      url: '/information/',
      views: {
        'article@': {
          templateUrl: 'app/info/info.html',
          controller: 'InformationCtrl'
        }
      }
    });
  }]);
