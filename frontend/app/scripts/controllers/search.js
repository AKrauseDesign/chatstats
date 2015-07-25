'use strict';

/**
 * @ngdoc function
 * @name websiteApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the websiteApp
 */
angular.module('websiteApp')
  .controller('SearchCtrl', function ($scope, socket, $http, $log) {
    $scope.foundUser = 0;
    $scope.clearUser = function() {
      $scope.foundUser = 0;
    };
    $scope.doSearch = function() {
      $scope.foundUser = 1;
      $http.get('http://stylerdev.io:3000/lookup/'+$scope.searchQuery).
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

          // Watched time
          $scope.watchedTime = data.watchedTime;
          $scope.watchedMinutesSearch   = $scope.watchedTime;
          $scope.watchedHoursSearch     = $scope.watchedMinutesSearch / 60;
          $scope.watchedDaysSearch      = $scope.watchedHoursSearch / 24;
          $scope.watchedYearsSearch     = $scope.watchedDaysSearch / 365;
          $scope.watchedCenturiesSearch = $scope.watchedYearsSearch / 100;

          $scope.count = data.count;
          $scope.lastMsg = data.lastMsg;
          $scope.lastMsgDate = data.updatedAt;
          $scope.foundUser = 2;
        }
      }).error(function(data){
        $log.error(data);
        $scope.foundUser = 3;
      });
    };
  });
