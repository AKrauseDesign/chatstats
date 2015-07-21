'use strict';

/**
 * @ngdoc filter
 * @name websiteApp.filter:emotes
 * @function
 * @description
 * # emotes
 * Filter in the websiteApp.
 */
angular.module('websiteApp')
  .filter('emotes', function (initial, $sanitize) {
    return function(text) {
      if (!text) {return text;}
      var linkRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
      text = $sanitize(text);

      var emoteList = initial.globalEmotes();

      emoteList.forEach(function(e) {
        if (!text.match(linkRegex)) {
          var reg = new RegExp(e.code + "\\b", 'g');
          text = text.replace(reg, '<img class=\"emote\" src=\"//static-cdn.jtvnw.net/emoticons/v1/' + e.id + '/1.0\"></img>');
        }
      });
      return text;

    };
  });
