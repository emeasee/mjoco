'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('main.landing', {
      url: '/',
      resolve: {
        coversData: ['apiService',
          function(apiService) {
            return apiService.get('vitals');
          }
        ]
      },
      views: {
        'article@': {
          templateUrl: 'app/cover/cover.html',
          controller: 'CoverCtrl'
        }
      }
    });

  }]);
