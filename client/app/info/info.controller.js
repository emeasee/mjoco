'use strict';

angular.module('mjocoApp')
  .controller('InformationCtrl', ['$rootScope', '$scope', '$location', '$timeout', '$log',
    function($rootScope, $scope, $location, $timeout, $log) {

      $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {

        $rootScope.pageTitle = "Information";

        $rootScope.primary.text = "Information";
        $rootScope.secondary.text = "Contact";
        $rootScope.tertiary.text = "";
        $rootScope.primary.arrow = true;
        $rootScope.secondary.arrow = false;

        $rootScope.description = "Description";
        $rootScope.image = '1461-w700';

        $rootScope.textColor = 'white-text';
        $rootScope.backgroundColor =  'red-background';
      });

    }
  ]);
