'use strict';

/**
 * @ngdoc function
 * @name websiteApp.controller:HalloffameCtrl
 * @description
 * # HalloffameCtrl
 * Controller of the websiteApp
 */
angular.module('websiteApp')
  .controller('HalloffameCtrl', function ($scope) {
    $scope.users = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
