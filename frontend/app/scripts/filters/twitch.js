'use strict';

/**
 * @ngdoc filter
 * @name websiteApp.filter:twitch
 * @function
 * @description
 * # twitch
 * Filter in the websiteApp.
 */
angular.module('websiteApp')
  .filter('twitch', function () {
    return function (input) {
      if(input.indexOf('Kappa') !== -1) {
        return '<img src="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0">';
      } else {
        return input;
      }
    };
  });
