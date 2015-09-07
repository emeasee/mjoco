'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('main.projects', {
      url: '/projects/{tags:[a-z0-9_-]{1,50}}/',
      resolve: {
        projectsData: ['apiService', '$stateParams',
          function(apiService, $stateParams) {
            return apiService.get('projects', {
              'tags': $stateParams.tags,
              'replace': true
            });
          }
        ]
      },
      views: {
        'article@': {
          templateUrl: 'app/projects/projects.html',
          controller: 'ProjectsCtrl'
        }
      }
    });
  }]);
