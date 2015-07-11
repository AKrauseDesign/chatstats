'use strict';

/**
 * @ngdoc service
 * @name websiteApp.socket
 * @description
 * # socket
 * Factory in the websiteApp.
 */
angular.module('websiteApp')
  .factory('socket', function (socketFactory) {
      return socketFactory();
  });
