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
        $rootScope.backgroundColor =  'blue-background';
      });

      $scope.subscribeText = '';
      $scope.submitEmail = function() {
        $scope.subscribeText = 'Please Wait...';

        $.ajax({
          type: 'POST',
          url: 'http://yesstudio.createsend.com/t/r/s/xhjid/',
          dataType: 'jsonp',
          data: {
            'cm-xhjid-xhjid': $scope.email
          },
          success: function(data) {
            $scope.emailResponse = data.Message;

            $scope.subscribeText = data.Status === 200 ? 'Thanks!' : 'Try Again!';

            $rootScope.trackEvent('Mailing List',$scope.subscribeText);

            if (!$scope.$$phase) {
              $scope.$apply();
            }

            $timeout(function() {
              $scope.email = $scope.emailResponse = '';
              $scope.subscribeText = '';
              $scope.subscribeOpen = false;
            }, 5000);
          }
        });
      };

      $scope.subscribeOpen = false;

      $scope.openSubscribe = function(){
        console.log('open');
        $scope.subscribeOpen = true;
        $(".contact-subscribe-form input").focus();
      };

    }
  ]);
