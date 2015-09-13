'use strict';

angular.module('mjocoApp')
  .controller('ProjectsCtrl', ['$rootScope', '$scope', '$location', '$log', '$window', 'localStorageService', 'projectsData',
    function($rootScope, $scope, $location, $log, $window, localStorageService, projectsData) {

      $scope.projects = projectsData.projects;

      if (projectsData.projects === null) {
        $location.path("/404/");
      }

      var tags = projectsData.tags;
      tags = tags.join('/');

      $log.debug('Projects', $scope.projects);

      $scope.currentPath = $location.path();

      $log.debug('location', $location);

      var indexRef = $location.path();

      if (localStorageService.get('fromProjects')) {
        $scope.startElement = parseInt(localStorageService.get(indexRef), 10);
      } else {
        $scope.startElement = 0;
      }

      $log.debug('startElement', $scope.startElement);

      localStorageService.remove('fromProjects');

      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

      });

      $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        updateHeader(0);

        $rootScope.primary.text = tags;
        $rootScope.tertiary.text = "";
        $rootScope.primary.arrow = true;
        $rootScope.secondary.arrow = false;

        $rootScope.description = 'A selection of ' + tags.toLowerCase() + ' projects';

        var imageID = $scope.projects[0].project_assets[0].asset_id;
        $rootScope.image = imageID + '-w700-q50';

        $rootScope.pageTitle = tags;

      });

      $rootScope.$watch('windowWidth', function(n) {

        if ($rootScope.isMobile) {
          $scope.imageSettingsMid = '-w700-q50';
          $scope.imageSettingsLarge = '-w700-q50';
          $scope.imageSettingsMidBoost = '-w700-q50';
          $scope.imageSettingsLargeBoost = '-w700-q50';
        } else if ($rootScope.windowWidth < 1200) {
          $scope.imageSettingsMid = '-w1200-q90';
          $scope.imageSettingsLarge = '-w1400-q90';
          $scope.imageSettingsMidBoost = '-w1200-q95';
          $scope.imageSettingsLargeBoost = '-w1400-q95';
        } else {
          $scope.imageSettingsMid = '-w1400-q90';
          $scope.imageSettingsLarge = '-w1600-q90';
          $scope.imageSettingsMidBoost = '-w1400-q95';
          $scope.imageSettingsLargeBoost = '-w1600-q95';
        }

      });

      $rootScope.animType = 'anim-fade';

      $scope.$on('hardscroll:change', function(event, args) {
        updateHeader(args.current);
        localStorageService.set(indexRef, args.current);
      });

      $scope.$on('hardscroll:click', function(event, args) {
        var url = $location.path();
        var projectUrl = $scope.projects[args.current].project_url + '/';
        if (url.indexOf(projectUrl) < 0) {
          url = url + projectUrl;
        }
        $log.debug('click to ' + url);
        $location.path(url);
        $scope.$apply();
      });

      var updateHeader = function(i) {
        setTimeout(function() {
          $rootScope.secondary.text = $scope.projects[i].project_title;
          $rootScope.secondary.url = $scope.projects[i].project_url;
          $rootScope.textColor = $scope.projects[i].project_colour + '-text';
          $rootScope.backgroundColor = $scope.projects[i].project_background + '-background';
          $scope.$apply();
        }, 1);
      };

    }]);
