'use strict';

angular.module('mjocoApp')
  .factory('apiService', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {

      var service = {};

      service.get = function(path, options) {

        var deferred = $q.defer();

        var params = {
          cache: true
        };

        $.extend(params, options);

        $http({
          method: 'GET',
          url: '/api/' + path,
          params: params,
          cache: params.cache
        }).success(function(data) {
          console.log('apiServiceLoaded',data);
          deferred.resolve(data);
        });

        return deferred.promise;
      };

      return service;
    }
  ]);
