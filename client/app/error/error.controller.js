'use strict';

angular.module('mjocoApp')
  .controller('ErrorCtrl', ['$rootScope', '$scope', '$location',
    function($rootScope, $scope, $location) {

      $scope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {

        // $rootScope.header.template = '';
        // $rootScope.header.hover = 'hover';

        $rootScope.pageTitle = "404";

        $rootScope.primary.text = "Error";
        $rootScope.secondary.text = "404";
        $rootScope.tertiary.text = "";
        $rootScope.primary.arrow = true;
        $rootScope.secondary.arrow = false;

        $rootScope.textColor = 'black-text';
        $rootScope.backgroundColor = 'white-background';
      });
    }
  ]);
