'use strict';

/**
 * @ngdoc function
 * @name websiteApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the websiteApp
 */
angular.module('websiteApp')
  .controller('SearchCtrl', function ($scope, socket, $http) {
    $scope.foundUser = 0;
    $scope.clearUser = function() {
      $scope.foundUser = 0;
    };
    $scope.doSearch = function() {
      $scope.foundUser = 1;
      $http.get('http://localhost:3000/lookup/'+$scope.searchQuery).
      success(function(data) {
        data = data.user;
        if(angular.isUndefined(data) || data === null ) {
          $scope.foundUser = 3;
        } else {
          $scope.name = data.name;
          $scope.watchedTime = data.watchedTime;
          $scope.count = data.count;
          $scope.lastMsg = data.lastMsg;
          $scope.foundUser = 2;
        }
      }).error(function(data){
        $scope.foundUser = 3;
      });
    };
  });
