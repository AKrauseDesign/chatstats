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
          $http.jsonp("https://api.twitch.tv/kraken/users/"+data.name+"?callback=JSON_CALLBACK").
          success(function(data) {
            if(data.logo !== null) {
              $scope.avatar = data.logo;
            } else {
              $scope.avatar = 'http://stylerdev.io/images/no_avatar.jpg';
            }
          });
          $scope.name = data.name;
          $scope.watchedTime = data.watchedTime;
          $scope.count = data.count;
          $scope.lastMsg = data.lastMsg;
          $scope.lastMsgDate = data.updatedAt;
          $scope.foundUser = 2;
        }
      }).error(function(data){
        $scope.foundUser = 3;
      });
    };
  });
