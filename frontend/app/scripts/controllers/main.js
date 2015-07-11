'use strict';

/**
 * @ngdoc function
 * @name websiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the websiteApp
 */
angular.module('websiteApp')
  .controller('MainCtrl', function ($rootScope, $scope, socket, $http, $log, initial) {
    $rootScope.initialized = false;
    socket.emit ('newConnection');
    socket.on('420', function() {
      var horn = document.getElementsByTagName('audio')[0];
      horn.play(); //GO HAM
    });
    $scope.chat = [];
    socket.on('initial', function () {
      $scope.kappaPerMinute = initial.kpm();
      $scope.globalEmotes = initial.globalEmotes();
      $scope.totalMessages = initial.totalMessages();
      $scope.users = initial.topUsers();
      $scope.commands = initial.topCommands();
      $scope.emotes = initial.topEmotes();
      $scope.subEmotes = initial.topSubEmotes();
      $scope.hashtags = initial.topHashtags();
      $rootScope.initialized = true;
      socket.removeListener('initial', function() {
      });
      $log.debug('Connected to Socket Server');
      $log.debug('ヽ༼ຈل͜ຈ༽ﾉ Ready to receive data ヽ༼ຈل͜ຈ༽ﾉ ');
      $log.debug('( ͡° ͜ʖ ͡°)⊃━☆ﾟ Received Initial data.. (∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ');
    });
    socket.on('stats', function(data){
    if($rootScope.initialized === true) {
      // Real time Twitch Chat
      $scope.totalMessages = data.chat.total;
      $scope.kappaPerMinute = data.chat.kpm;
      $scope.chat.unshift(data.chat);

      // DON'T FUCK WITH IT - IT TWERKS
      var compare = function(scope, name, to) {
        for (var i = 0; i < scope.length; i++) {
          if (scope[i][name] === to) {
            return scope[i];
          }
        }
      };

      var words = data.chat.msg.split(' ');

      // Top Users Filter
      var topUser = compare($scope.users, 'name', data.chat.name);
      if(topUser) {
       topUser.count = topUser.count += 1;
       topUser.lastMsg = data.chat.msg;
       topUser.lastUser = data.chat.name;
       topUser.lastMsgDate = data.chat.date;
      }

      // Global Emotes Filter
      for (var emote in $scope.globalEmotes) {
        for (var i = 0; i < words.length; i++) {
          if (words[i] === $scope.globalEmotes[emote].code) {
            var Emote = compare($scope.emotes, 'emote', words[i]);
            if (Emote) {
              Emote.count = Emote.count += 1;
              Emote.lastUser = data.chat.name;
              Emote.lastMsg = data.chat.msg;
              Emote.lastMsgDate = data.chat.date;
            }
          }
        }
      }

      // Subscriber Emotes Filter
      // SO SORRY ABOUT THE NAMING :(
      for (var subEmote in $scope.subEmotes) {
        for (var e = 0; e < words.length; e++) {
          if (words[e] === $scope.subEmotes[subEmote].emote) {
            var SubscriberEmote = compare($scope.subEmotes, 'emote', words[e]);
            if (SubscriberEmote) {
              SubscriberEmote.count = SubscriberEmote.count += 1;
              SubscriberEmote.lastUser = data.chat.name;
              SubscriberEmote.lastMsg = data.chat.msg;
              SubscriberEmote.lastMsgDate = data.chat.date;
            }
          }
        }
      }

      // Top Hashtag Filter
      var regExHash = /(#)([a-zA-Z0-9_]+)/g, execHash;
      execHash = regExHash.exec(data.chat.msg);
      if (execHash !== null) {
       var Hashtags = compare($scope.hashtags, 'hashtag', execHash[0]);
       if(Hashtags) {
         Hashtags.count = Hashtags.count += 1;
         Hashtags.lastUser = data.chat.name;
         Hashtags.lastMsg = data.chat.msg;
         Hashtags.lastMsgDate = data.chat.date;
       }
      }

      // Top Command Filter
      var regExCommand = /(!)([a-zA-Z0-9_]+)/g, execCommand;
      execCommand = regExCommand.exec(data.chat.msg);
      if (execCommand !== null) {
        var Command = compare($scope.commands, 'command', execCommand[0]);
        if(Command) {
         Command.count = Command.count += 1;
         Command.lastUser = data.chat.name;
         Command.lastMsg = data.chat.msg;
         Command.lastMsgDate = data.chat.date;
        }
      }
    }
  });
});
