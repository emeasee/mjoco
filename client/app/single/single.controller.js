'use strict';

angular.module('mjocoApp')
.controller('SingleCtrl', ['$rootScope', '$scope', '$location', '$log', '$window', '$timeout', 'localStorageService', 'projectData', 'projectsData',
  function($rootScope, $scope, $location, $log, $window, $timeout, localStorageService, projectData, projectsData) {

    $scope.projects = projectsData.projects;

    localStorageService.set('fromProjects', true);

    $log.debug('Projects',$scope.projects);

    $scope.project = projectData[0];

    if(typeof $scope.project !== 'object'){
      $location.path( "/404/" );
    }

    $log.debug('Project', $scope.project);

    $scope.currentPath = $location.$$path;

    var tags = projectsData.tags;
    tags = tags.join('/');

    $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
      updateNextPrev(toParams);

      updateHeader();
      $($window).trigger('resize');

      $rootScope.canonical = '/projects/archive/'+toParams.url+'/';

    });

    $scope.$on('$destroy', function(){
      $rootScope.canonical = '';
    });

    $rootScope.$on('animEnd', function($event, element, speed) {
      // setTimeout(updateHeader,100);
      $($window).trigger('resize');
    });

    // Dirty Safari Body Height Redraw Hack
    var setDummy = function (){
      document.getElementById("force-safari-redraw").style.bottom = 10 - Math.random() * 20 + 'px';
      requestAnimationFrame(setDummy);
    };
    if (navigator.userAgent.indexOf('Safari') !== -1 && !navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
      setDummy();
    }

    $rootScope.$watch('windowWidth', function(n) {

      if ($rootScope.isMobile) {
        $scope.imageSettingsMid = '-w700-q50';
        $scope.imageSettingsMidBoost = '-w700-q50';
      } else {
        $scope.imageSettingsMid = '-w1200-q90';
        $scope.imageSettingsMidBoost = '-w1200-q95';
      }

    });

    var updateNextPrev = function(toParams){

      $scope.projectPosition = 0;

      angular.forEach($scope.projects, function(project, key) {
        if(toParams.url === project.project_url){
          $scope.projectPosition = key;
        }
      });

      $rootScope.next.position = $scope.projectPosition + 1;
      $rootScope.prev.position = $scope.projectPosition - 1;

      if($rootScope.next.position > $scope.projects.length - 1){
        $rootScope.next.position = 0;
      }

      if($rootScope.prev.position < 0){
        $rootScope.prev.position = $scope.projects.length - 1;
      }

      $rootScope.next.assets = $scope.projects[$rootScope.next.position].project_assets;
      $rootScope.prev.assets = $scope.projects[$rootScope.prev.position].project_assets;

      $rootScope.next.assets.splice(1);
      $rootScope.prev.assets.splice(1);

      $rootScope.next.url = "/projects/"+ toParams.tags + "/" + $scope.projects[$rootScope.next.position].project_url;
      $rootScope.prev.url = "/projects/"+ toParams.tags + "/" + $scope.projects[$rootScope.prev.position].project_url;

      $rootScope.next.title = $scope.projects[$rootScope.next.position].project_title;
      $rootScope.prev.title = $scope.projects[$rootScope.prev.position].project_title;

      $rootScope.next.slug = $scope.projects[$rootScope.next.position].project_url;
      $rootScope.prev.slug = $scope.projects[$rootScope.prev.position].project_url;

      setTimeout(function(){
        $rootScope.prev.hide = false;
        $rootScope.next.hide = false;
      },1000);

    };

    var updateHeader = function(){

      $rootScope.primary.text = tags;
      $rootScope.secondary.text = $scope.project.project_title;

      $rootScope.primary.arrow = true;
      $rootScope.secondary.arrow = false;

      $rootScope.pageTitle = $scope.project.project_title;

      $rootScope.textColor =  $scope.project.project_color+'-text';
      $rootScope.backgroundColor =  $scope.project.project_background+'-background';


      $rootScope.description = $scope.project.project_text.replace(/(<([^>]+)>)/ig,"");

      var imageID = $scope.project.project_assets[0].asset_id;
      $rootScope.image = imageID + '-w700-q50';

    };

    $scope.getAssetSize = function(asset){
      var ratio = (asset.asset_height/asset.asset_width)*100;
      return {
        'padding-bottom': ratio+'%'
      };
    };

    $($window).on('resize', function(e) {
      $rootScope.next.width = $('.related-project .asset').width();
      $rootScope.next.height = $('.related-project .asset').height();
    });

    $scope.playVideo = function($event){
      $($event.currentTarget).parent().addClass('playing');
      var video = $($event.currentTarget).parent().find('video').get(0);
      $log.debug('playVideo',video,$($event.currentTarget).parent());
      video.play();
    };

  }
]);
