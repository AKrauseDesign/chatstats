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

      var emoteList = initial.allEmotes();

      for(var i = 0; i < emoteList.length; i++) {
        var e = emoteList[i];
        if (!text.match(linkRegex)) {
          var reg = new RegExp(e.regex + "\\b", 'g');
          text = text.replace(reg, '<img class=\"emote\" src=\"' + e.url + '\">');
        }
      }
      return text;
    };
  });
