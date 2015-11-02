'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('main.vitals', {
      url: '/vitals/',
      resolve: {
        vitalsData: ['apiService',
          function(apiService) {
            return apiService.get('vitals');
          }
        ]
      },
      views: {
        'article@': {
          templateUrl: 'app/vitals/vitals.html',
          controller: 'VitalsCtrl'
        }
      }
    });

    $stateProvider.state('main.vital', {
      url: '/vitals/{url:[a-z0-9_-]{1,50}}/',
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
