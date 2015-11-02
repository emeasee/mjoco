'use strict';

angular.module('mjocoApp')
  .controller('VitalsCtrl', ['$rootScope', '$scope', '$location', 'vitalsData',
    function($rootScope, $scope, $location, vitalsData) {

      $scope.vitals = vitalsData;

      $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        // $rootScope.header.template = '';
        // $rootScope.header.hover = 'hover';

        $rootScope.pageTitle = "Vitals";

        $rootScope.primary.text = "Vitals";
        $rootScope.secondary.text = "Index";
        $rootScope.tertiary.text = "";
        $rootScope.primary.arrow = true;
        $rootScope.secondary.arrow = false;

        var imageID = $scope.vitals.vitals[0].assets[0].asset_id;
        $rootScope.image = imageID + '-w700';

        $rootScope.textColor = 'white-text';
        $rootScope.backgroundColor =  'black-background';
      });


    }]);
