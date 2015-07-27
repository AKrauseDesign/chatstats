'use strict';

/**
 * @ngdoc function
 * @name websiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the websiteApp
 */


// If you want to only select one element you can
// omit the multiple argument or pass in false.
// use these functions in the future when
// You want to remove classes from elements
// ---------------------------------------
function removeClassTag(element, Class, multiple) {
var target;
if(multiple === true) {
target = document.getElementsByTagName(element);

  for(var i = 0; i < target.length; i++) {
    target[i].classList.remove(Class);
  }
} else {
  target = document.getElementByTagName(element);
  target.classList.remove(Class);
}
}



function removeClassId(element, Class) {
  var target = document.getElementById(element);
  target.classList.remove(Class);
}


function removeClass(element, Class, multiple) {
  var target;
  if(multiple === true) {
    target = document.getElementsByClassName(element);

    for(var i = 0; i < target.length; i++) {
      target[i].classList.remove(Class);
    }
  } else {
    target = document.getElementByClassName(element);
    target.classList.remove(Class);
  }
}
// ---------------------------------------

angular.module('websiteApp')
  .controller('MainCtrl', function ($rootScope, $interval, $scope, socket, $http, $log, initial) {
    function getTwitchStatus(twitch){
      $http.jsonp("https://api.twitch.tv/kraken/streams/"+twitch+"?callback=JSON_CALLBACK").
      success(function(data) {
        if(data.stream) {
          $scope.streamViewers = data.stream.viewers;
          $scope.streamStatus = true;
        } else {
          $scope.streamStatus = false;
        }
      });
    }
    // Initial Status
    getTwitchStatus('massansc');

    // Refresh every 60 seconds
    $interval(function() {
      getTwitchStatus('massansc');
    }, 1000 * 60);

    $rootScope.initialized = false;
    socket.on('420', function() {
      var horn = document.getElementsByTagName('audio')[0];
      horn.play(); //GO HAM
    });
    $scope.chat = [];

    if($scope.chat.length <= 0){
      $scope.noChat = true;
    }





    $scope.isDay = true;
    $scope.isNight = false;
    $scope.changeScheme = function() {
      var body     = document.getElementsByTagName('body');
      var nav      = document.getElementByClassName('nav');
      var wellsm   = document.querySelectorAll('.col-md-4 > .well-sm');
      var tableTr  = document.querySelectorAll('.table-striped > tr');
      var navA     = document.querySelector('.navbar-default .navbar-nav > .active > a');
      var navBrand = document.querySelector('.navbar-default .navbar-brand');
      var navLiA   = document.querySelectorAll('.navbar-default .navbar-nav > li > a');

      if($scope.isLight === true) {
        body.setAttribute('class', body.getAttribute('class') + ' body-night');
        nav.setAttribute('class', nav.getAttribute('class') + ' navbar-night');
        navA.setAttribute('class', navA.getAttribute('class') + ' active-night');
        navBrand.setAttribute('class', navBrand.getAttribute('class') + ' active-night lings-night');

        for(var i = 0; i < wellsm.length; i++) {
          wellsm[i].setAttribute('class', wellsm[i].getAttribute('class') + ' blocks-night');
        }
        for(var j = 0; j < tableTr.length; j++) {
          var td = tableTr[j].document.getElementsByTagName('td');
          td[1].setAttribute('class', td[1].getAttribute('class') + ' border-night');
        }
        for(var k = 0; k < navLiA.length; k++) {
          navLiA[k].setAttribute('class', navLiA[k].getAttribute('class') + ' links-night');
        }

        $scope.isDay = false;
        $scope.isNight  = true;
      }else {

        body.classList.remove('body-night');
        nav.classList.remove('navbar-night');

        navA.classList.remove('active-night');
        navBrand.classList.remove('active-night');
        navBrand.classList.remove('lings-night');

        $scope.isNight = false;
        $scope.isDay = true;


        for(var l = 0; l < wellsm.length; l++) {
          wellsm[l].classList.remove('blocks-night');
        }
        for(var m = 0; m < tableTr.length; m++) {
          var td_r = tableTr[m].document.getElementsByTagName('td');
          td_r[1].classList.remove('border-night');
        }
        for(var n = 0; n < navLiA.length; n++) {
          navLiA.classList.remove('lings-night');
        }

      }
    };

    socket.on('initial', function () {
      $scope.kappaPerMinute = initial.kpm();
      $scope.globalEmotes = initial.allEmotes();
      $scope.totalMessages = initial.totalMessages();
      $scope.totalUsers = initial.totalUsers();
      $scope.users = initial.topUsers();
      $scope.commands = initial.topCommands();
      $scope.emotes = initial.topEmotes();
      $scope.subEmotes = initial.topSubEmotes();
      $scope.hashtags = initial.topHashtags();

      $scope.watchedMinutes   = initial.totalWatched();
      $scope.watchedHours     = $scope.watchedMinutes / 60;
      $scope.watchedDays      = $scope.watchedHours / 24;
      $scope.watchedYears     = $scope.watchedDays / 365;
      $scope.watchedCenturies = $scope.watchedYears / 100;

      $rootScope.initialized = true;
      socket.removeListener('initial', function(){});
      $log.debug('Connected to Socket Server');
      $log.debug('ヽ༼ຈل͜ຈ༽ﾉ Ready to receive data ヽ༼ຈل͜ຈ༽ﾉ ');
      $log.debug('( ͡° ͜ʖ ͡°)⊃━☆ﾟ Received Initial data.. (∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ');
    });

    socket.on('stats', function(data){
    if($rootScope.initialized === true) {
      // Real time Twitch Chat
      $scope.totalMessages = data.total;
      $scope.chat.unshift(data);

      // DON'T FUCK WITH IT - IT TWERKS
      var compare = function(scope, name, to) {
        for (var i = 0; i < scope.length; i++) {
          if (scope[i][name] === to) {
            return scope[i];
          }
        }
      };

      var words = data.msg.split(' ');

      // Top Users Filter
      var topUser = compare($scope.users, 'name', data.user.name);
      if(topUser) {
       topUser.count = topUser.count += 1;
       topUser.lastMsg = data.msg;
       topUser.lastUser = data.user.name;
       topUser.lastMsgDate = data.date;
      }

      // Global Emotes Filter
      for (var emote in $scope.globalEmotes) {
        for (var i = 0; i < words.length; i++) {
          if (words[i] === $scope.globalEmotes[emote].regex) {
            var Emote = compare($scope.emotes, 'emote', words[i]);
            if (Emote) {
              Emote.count = Emote.count += 1;
              Emote.lastUser = data.user.name;
              Emote.lastMsg = data.msg;
              Emote.lastMsgDate = data.date;
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
              SubscriberEmote.lastUser = data.user.name;
              SubscriberEmote.lastMsg = data.msg;
              SubscriberEmote.lastMsgDate = data.date;
            }
          }
        }
      }

      // Top Hashtag Filter
      var regExHash = /(#)([a-zA-Z0-9_]+)/g, execHash;
      execHash = regExHash.exec(data.msg);
      if (execHash !== null) {
       var Hashtags = compare($scope.hashtags, 'hashtag', execHash[0]);
       if(Hashtags) {
         Hashtags.count = Hashtags.count += 1;
         Hashtags.lastUser = data.user.name;
         Hashtags.lastMsg = data.msg;
         Hashtags.lastMsgDate = data.date;
       }
      }

      // Top Command Filter
      var regExCommand = /(!)([a-zA-Z0-9_]+)/g, execCommand;
      execCommand = regExCommand.exec(data.msg);
      if (execCommand !== null) {
        var Command = compare($scope.commands, 'command', execCommand[0]);
        if(Command) {
         Command.count = Command.count += 1;
         Command.lastUser = data.user.name;
         Command.lastMsg = data.msg;
         Command.lastMsgDate = data.date;
        }
       }
    }
  });
});
