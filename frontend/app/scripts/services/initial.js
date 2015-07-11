'use strict';

/**
 * @ngdoc service
 * @name websiteApp.data
 * @description
 * # data
 * Factory in the websiteApp.
 */
angular.module('websiteApp')
  .factory('initial', function (socket) {
    var globalemotes,totalMessages,users,commands,emotes,subEmotes,hashtags,kpm;
      socket.on('initial', function(init) {
        globalemotes    = init.globalEmotes;
        totalMessages   = init.totalMessages;
        kpm             = init.kpm;
        users           = init.users;
        commands        = init.commands;
        emotes          = init.emotes;
        subEmotes       = init.subemotes;
        hashtags        = init.hashtags;
      });
    // Public API here
    return {
      globalEmotes: function () {
        return globalemotes;
      },
      totalMessages: function() {
        return totalMessages;
      },
      topUsers: function() {
        return users;
      },
      topCommands: function() {
        return commands;
      },
      topEmotes: function(){
        return emotes;
      },
      topSubEmotes: function(){
        return subEmotes;
      },
      topHashtags: function() {
        return hashtags;
      },
      kpm: function() {
        return kpm;
      }
    };
  });
