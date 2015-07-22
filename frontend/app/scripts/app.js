'use strict';

/**
 * @ngdoc overview
 * @name websiteApp
 * @description
 * # websiteApp
 *
 * Main module of the application.
 */
angular
  .module('websiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'ui.bootstrap',
    'ui.router'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

      // Main States
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
      })
      .state('halloffame', {
        url: '/halloffame',
        templateUrl: 'views/hof.html',
        controller: 'HalloffameCtrl'
      })
      .state('search', {
        controller: 'SearchCtrl',
        url: '/search/{user}',
        templateUrl: 'views/search.html',
      });

      // Everything Else
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true); // Get rid of #/
  });
