'use strict';

/**
 * @ngdoc service
 * @name websiteApp.api
 * @description
 * # api
 * Factory in the websiteApp.
 */
angular.module('websiteApp')
  .factory('api', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
