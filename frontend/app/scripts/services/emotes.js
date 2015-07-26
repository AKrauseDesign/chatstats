'use strict';

/**
 * @ngdoc service
 * @name websiteApp.emotes
 * @description
 * # emotes
 * Factory in the websiteApp.
 */
angular.module('websiteApp')
  .factory('emotes', function ($q, $http) {

    var channel = 'massansc';
    var emoteAPI = {
      global: 'https://twitchemotes.com/api_cache/v2/global.json',
      subscriber: 'https://twitchemotes.com/api_cache/v2/subscriber.json',
      betterttv: 'https://cdn.betterttv.net/emotes/emotes.json'
    };

    function parseGlobal(obj) {
      obj = angular.fromJson(obj);
      var newObj = {};
      for (var emote in obj.emotes) {
        if(typeof emote !== 'undefined') {
          newObj[emote] = obj.emotes[emote].image_id;
        }
      }
      return newObj;
    }

    function parseSubscriber(obj) {
      obj = angular.fromJson(obj);
      var newObj = {};
      for (var i in obj.channels[channel].emotes) {
        var j = obj.channels[channel].emotes[i];
        if(typeof j.code !== 'undefined') {
          newObj[j.code] = j.image_id;
        }
      }
      return newObj;
    }

    function parseBttv(obj) {
      obj = angular.fromJson(obj);
      var newObj = {};
      for (var emote in obj) {
        if(typeof obj[emote].regex !== 'undefined') {
          newObj[obj[emote].regex] = obj[emote].url;
        }
      }
      return newObj;
    }

    return {
      getGlobalEmotes: function () {
        var defer = $q.defer();
          $http.get(emoteAPI.global).
          success(function(data) {
            defer.resolve(parseGlobal(data));
          }).
          error(function(data) {
            defer.reject(data);
          });
        return defer.promise;
      },
      getSubscriberEmotes: function() {
        var defer = $q.defer();
          $http.get(emoteAPI.subscriber).
          success(function(data) {
            defer.resolve(parseSubscriber(data));
          }).
          error(function(data) {
            defer.reject(data);
          });
        return defer.promise;
      },
      getBttvEmotes: function() {
        var defer = $q.defer();
          $http.get(emoteAPI.betterttv).
          success(function(data) {
            defer.resolve(parseBttv(data));
          }).
          error(function(data) {
            defer.reject(data);
          });
        return defer.promise;
      }
    };
  });
