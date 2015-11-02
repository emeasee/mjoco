'use strict';

angular.module('mjocoApp')
  .controller('ArchiveCtrl', ['$rootScope', '$scope', '$location', 'projectsData',
    function($rootScope, $scope, $location, projectsData) {

      $scope.projects = projectsData.projects;

      //console.log('Projects', $scope.projects);

      $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        $rootScope.primary.text = 'Projects';
        $rootScope.secondary.text = 'Archive';
        $rootScope.tertiary.text = '';
        $rootScope.primary.arrow = true;
        $rootScope.secondary.arrow = false;

        $rootScope.pageTitle = 'Archive';

        $scope.imageSettingsSmall = '-w400';

        $rootScope.textColor = 'black-text';
        $rootScope.backgroundColor =  'white-background';

      });

      $scope.activeTag = '';

      $scope.archiveLeave = function(){
        $scope.activeTag = '';
      };

      $scope.archiveHover = function(tag) {
        $scope.activeTag = tag;
      };

      $scope.archiveActive = function(tag) {
        if (tag === $scope.activeTag) {
          return 'active';
        } else {
          return '';
        }
      };

    }]);
