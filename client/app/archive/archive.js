'use strict';

angular.module('mjocoApp')
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('main.archive', {
      url: '/projects/archive/',
      resolve: {
        projectsData: ['apiService', '$stateParams',
          function(apiService, $stateParams) {
            return apiService.get('projects/all');
          }
        ]
      },
      views: {
        'article@': {
          templateUrl: 'app/archive/archive.html',
          controller: 'ArchiveCtrl'
        }
      }
    });

  }]);
