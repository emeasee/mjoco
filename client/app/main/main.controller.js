'use strict';

angular.module('mjocoApp')
  .controller('MainCtrl', ['$log', '$scope', '$stateParams', '$state', '$rootScope', '$location', '$window', '$document', '$timeout', 'localStorageService',
    function($log, $scope, $stateParams, $state, $rootScope, $location, $window, $document, $timeout, localStorageService) {

      $rootScope.$on('animStart', function($event, element, speed) {

      });

      $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
        $state.previous = fromState;

        $rootScope.stateID = toState.name.replace('.', '-');

        $rootScope.menuOpen = false;
      });

      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if(toState.name !== 'main.project'){
          $rootScope.animType = 'anim-fade';
        }

        if(fromState.name !== 'main.project'){
          localStorageService.remove('fromProjects');
        }

        if(toState.name === 'main.project' && fromState.name === 'main.project'){
          // $rootScope.animSync = true;
        } else {
          $rootScope.animSync = false;
        }

        if(toState.name === 'main.project' && fromState.name === 'main.projects'){
          $rootScope.animType = 'anim-slide-up-from-fade';
        }

      });

      $rootScope.$on('animEnd', function() {
        // var videos = angular.element('body').find('video');
        // angular.forEach(videos, function(video,key){
        // 	video.pause();
        // });
      });

      $rootScope.setAnim = function(anim){
        $rootScope.animType = anim;
      };

      $scope.imageSettingsSmall = '-w700';
      $scope.imageSettingsMid = '-w700';
      $scope.imageSettingsLarge = '-w700';

      $rootScope.pageTitle = $rootScope.strapline;

      $rootScope.image = '1461-w700';

      $scope.app = {
        bucketPath: 'http://s3-eu-west-1.amazonaws.com/mjoco/',
        bucketName: 's3-eu-west-1.amazonaws.com/mjoco'
      };

      // Strange IE bug
      $rootScope.isTouch = false;
      if(Modernizr.touch){
        $rootScope.isTouch = true;
      }

      $log.debug('isTouch',$rootScope.isTouch);

      $rootScope.isMobile = false;
      $rootScope.isPortrait = false;

      $($window).on('resize', function(e) {
        $rootScope.windowWidth = $($window).width();
        $rootScope.windowHeight = $($window).height();
        var newIsMobile;
        if($rootScope.windowWidth < 750){
          newIsMobile = true;
        } else {
          newIsMobile = false;
        }
        if($rootScope.isMobile !== newIsMobile){
          setTimeout(function(){
            $scope.$apply(function(){
              $rootScope.isMobile = newIsMobile;
              $log.debug('resize!');
            });
          });
        }
        var newIsPortrait;
        if($rootScope.windowWidth/$rootScope.windowHeight < 0.8){
          newIsPortrait = true;
        } else {
          newIsPortrait = false;
        }
        if($rootScope.isPortrait !== newIsPortrait){
          setTimeout(function(){
            $scope.$apply(function(){
              $rootScope.isPortrait = newIsPortrait;
            });
          });
        }
      });

      $($window).trigger('resize');

      $rootScope.primary = {};
      $rootScope.secondary = {};
      $rootScope.tertiary = {};

      $rootScope.primary.text = "";
      $rootScope.secondary.text = "";
      $rootScope.tertiary.text = "";

      $rootScope.textColor = "black-text";
      $rootScope.backgroundColor = "white-background";

      $rootScope.next = {};
      $rootScope.prev = {};

      $rootScope.next.url = 'test';
      $rootScope.prev.url = 'test';

      $rootScope.animType = 'anim-fade';
      $rootScope.animSync = false;

      $rootScope.menuOpen = true;

      $rootScope.menuOpen = false;

      $rootScope.toggleMenu = function(){
        $rootScope.menuOpen = !$rootScope.menuOpen;
        console.log('menu',$rootScope.menuOpen);
      };

      $rootScope.stateReload = function() {
        $state.reload();
      };

      $rootScope.paddingFromAssets = function(assets) {
        return $rootScope.paddingFromAsset(assets[0]);
      };

      $rootScope.paddingFromAsset = function(asset) {
        return asset.asset_height / asset.asset_width * 100 + '%';
      };

      $rootScope.getAssetHeight = function(asset) {
        var ratio = asset.asset_height / asset.asset_width;
        return {
          'padding-bottom':ratio*100+'%'
        };
      };

      $rootScope.getAssetsHeight = function(assets){
        var maxRatio = 0.1;
        angular.forEach(assets, function(a, i) {
          var ratio = a.asset_height/a.asset_width;
          if(ratio > maxRatio){
            maxRatio = ratio;
          }
        });
        return {
          'padding-bottom':maxRatio*100+'%'
        };
      };

      $rootScope.headerHoverIn = function(){
        if($rootScope.stateID === 'main-landing'){
          $rootScope.bodyHeaderClass = 'header-out';
        } else {
          $rootScope.bodyHeaderClass = 'header-in';
        }
      };

      $rootScope.headerHoverOut = function(){
        $rootScope.bodyHeaderClass = 'header-out';
      };

      $rootScope.toProperCase = function(string) {
        return string.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };

    }]);
