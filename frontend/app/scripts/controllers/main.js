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
    $rootScope.initialized = true;
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
      $scope.totalMessages = data.total;
      $scope.kappaPerMinute = data.kpm;
      $scope.chat.unshift(data);

      // DON'T FUCK WITH IT - IT TWERKS
      // var compare = function(scope, name, to) {
      //   for (var i = 0; i < scope.length; i++) {
      //     if (scope[i][name] === to) {
      //       return scope[i];
      //     }
      //   }
      // };
      //
      // var words = data.msg.split(' ');
      //
      // // Top Users Filter
      // var topUser = compare($scope.users, 'name', data.name);
      // if(topUser) {
      //  topUser.count = topUser.count += 1;
      //  topUser.lastMsg = data.msg;
      //  topUser.lastUser = data.name;
      //  topUser.lastMsgDate = data.date;
      // }
      //
      // // Global Emotes Filter
      // for (var emote in $scope.globalEmotes) {
      //   for (var i = 0; i < words.length; i++) {
      //     if (words[i] === $scope.globalEmotes[emote].code) {
      //       var Emote = compare($scope.emotes, 'emote', words[i]);
      //       if (Emote) {
      //         Emote.count = Emote.count += 1;
      //         Emote.lastUser = data.name;
      //         Emote.lastMsg = data.msg;
      //         Emote.lastMsgDate = data.date;
      //       }
      //     }
      //   }
      // }
      //
      // // Subscriber Emotes Filter
      // // SO SORRY ABOUT THE NAMING :(
      // for (var subEmote in $scope.subEmotes) {
      //   for (var e = 0; e < words.length; e++) {
      //     if (words[e] === $scope.subEmotes[subEmote].emote) {
      //       var SubscriberEmote = compare($scope.subEmotes, 'emote', words[e]);
      //       if (SubscriberEmote) {
      //         SubscriberEmote.count = SubscriberEmote.count += 1;
      //         SubscriberEmote.lastUser = data.name;
      //         SubscriberEmote.lastMsg = data.msg;
      //         SubscriberEmote.lastMsgDate = data.date;
      //       }
      //     }
      //   }
      // }
      //
      // // Top Hashtag Filter
      // var regExHash = /(#)([a-zA-Z0-9_]+)/g, execHash;
      // execHash = regExHash.exec(data.msg);
      // if (execHash !== null) {
      //  var Hashtags = compare($scope.hashtags, 'hashtag', execHash[0]);
      //  if(Hashtags) {
      //    Hashtags.count = Hashtags.count += 1;
      //    Hashtags.lastUser = data.name;
      //    Hashtags.lastMsg = data.msg;
      //    Hashtags.lastMsgDate = data.date;
      //  }
      // }
      //
      // // Top Command Filter
      // var regExCommand = /(!)([a-zA-Z0-9_]+)/g, execCommand;
      // execCommand = regExCommand.exec(data.msg);
      // if (execCommand !== null) {
      //   var Command = compare($scope.commands, 'command', execCommand[0]);
      //   if(Command) {
      //    Command.count = Command.count += 1;
      //    Command.lastUser = data.name;
      //    Command.lastMsg = data.msg;
      //    Command.lastMsgDate = data.date;
      //   }
      //  }
    }
  });
});
