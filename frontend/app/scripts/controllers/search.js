'use strict';

/**
 * @ngdoc function
 * @name websiteApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the websiteApp
 */
angular.module('websiteApp')
  .controller('SearchCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
