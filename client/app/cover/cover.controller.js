'use strict';

angular.module('mjocoApp')
  .controller('CoverCtrl', ['$rootScope', '$scope', '$location', '$log', 'coversData', 'localStorageService',
    function ($rootScope, $scope, $location, $log, coversData, localStorageService) {

      var covers = coversData;
      var index;
      var imageID;

      $log.debug('Covers', covers);

      $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        if(toParams.url){
          //TODO: Figure this out once we have the testcards page sorted out
          angular.forEach(covers, function(cover, i) {
            if (cover.url === toParams.url) {
              index = i + 1;
            }
          });

          if (!index) {
            $location.path("/404");
          } else {
            $scope.cover = covers[index - 1];
          }

          var supported = true;

          angular.forEach($scope.cover.data_requirements, function(requirement, o) {
            if (requirement === 'webgl') {
              if (Detector.webgl === null || Detector.webgl === false) {
                supported = false;
              }
            } else {
              if (!Modernizr[requirement]) {
                supported = false;
              }
            }
          });

          $scope.supported = supported;

          $rootScope.pageTitle = 'Cover — ' + $scope.testcard.title;

          //imageID = $scope.testcard.node_assets[0].asset_id;
          //$rootScope.image = imageID + '-w700';
          //
          $rootScope.primary.text = "Covers";
          $rootScope.secondary.text = $scope.cover.title;
          $rootScope.tertiary.text = "";
          $rootScope.primary.arrow = true;
          $rootScope.secondary.arrow = false;

        } else {

          index = parseInt(localStorageService.get('cover'), 10);

          $scope.landing = true;

          $scope.covers = [];

          angular.forEach(covers, function(cover, i) {
            var supported = true;
            angular.forEach(cover.data_requirements, function(requirement, o) {
              if (requirement === 'webgl') {
                if (Detector.webgl === null || Detector.webgl === false) {
                  supported = false;
                }
              } else {
                if (!Modernizr[requirement]) {
                  supported = false;
                }
              }
            });

            if (supported) {
              $scope.covers.push(cover);
            }

            if (isNaN(index)) {
              index = 0;
            } else {
              index++;
            }

            if (index >= $scope.covers.length) {
              index = 0;
            }

            $scope.cover = $scope.covers[index];

            $log.debug('Cover', $scope.cover);

            $rootScope.bodyHeaderClass = 'header-out';

            $rootScope.pageTitle = $rootScope.strapline;
            $rootScope.description = $rootScope.landingdescription;

            //TODO: Investigate this a bit more
            //imageID = $scope.testcard.node_assets[0].asset_id;
            //$rootScope.image = imageID + '-w700';

            $rootScope.primary.text = "M-JO.CO";

            $rootScope.secondary.text = "";
            $rootScope.tertiary.text = "";
            $rootScope.primary.arrow = false;
            $rootScope.secondary.arrow = false;

          });

        }

        localStorageService.set('cover', index);
        //FIXME: This needs to be turned on again before deploy or the cover does not show
        $scope.coverUrl = $scope.cover.data_url;
        $rootScope.textColor = $scope.cover.data_colour + '-text';
        $rootScope.backgroundColor = $scope.cover.data_background + '-background';

      });

      $rootScope.$on('animEnd', function($event, element, speed) {

      });

    }]);

