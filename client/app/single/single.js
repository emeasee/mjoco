'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('main.project', {
      url: '/projects/{tags:[a-z0-9_-]{1,50}}/{url:[a-z0-9_-]{1,50}}/',
      resolve: {
        projectsData: ['apiService', '$stateParams',
          function(apiService, $stateParams) {
            return apiService.get('projects', {
              'tags': $stateParams.tags
            });
          }
        ],
        projectData: ['apiService', '$stateParams',
          function(apiService, $stateParams) {
            return apiService.get('projects/' + $stateParams.url, {
              'filter': $stateParams.tags
            });
          }
        ]
      },
      views: {
        'article@': {
          templateUrl: 'app/single/single.html',
          controller: 'SingleCtrl'
        }
      }
    });
  }]);
