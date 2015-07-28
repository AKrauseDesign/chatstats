var q                 = require('q');
var userHandler       = require('./users');
var hashtagHandler    = require('./hashtags');
var emoteHandler      = require('./emotes');
var subEmoteHandler   = require('./subEmotes');
var bttvEmoteHandler  = require('./bttvEmote');
var commandHandler    = require('./commands');
var request           = require('request');
var kpmodule          = require('./kpm');
var data              = require('./startup');
var logger            = require('../utils/logger');

var globalEmotes, subEmotes, bttvEmotes;
q.all([
  data.getGlobalEmotes(),
  data.getSubscriberEmotes(),
  data.getBttvEmotes()
]).spread(function(resGlobal, resSub, resBTTV){
  globalEmotes  = resGlobal;
  subEmotes     = resSub;
  bttvEmotes    = resBTTV;
}).fail(function(err){
  logger.error('Fetching: '+err);
  return true;
});

module.exports = function(userObj, message) {
  var user = userObj.username;

  // Hashtag Handler
  var regExHash = /(#)([a-zA-Z0-9_]+)/g, execHash;
  execHash = regExHash.exec(message);
  if (execHash !== null) {
    if (execHash[1] === '#') {
      hashtagHandler(execHash[0], user, message);
    }
  }

  // Command Handler
  var regExCommand = /(!)([a-zA-Z0-9_]+)/g, execCommand;
  execCommand = regExCommand.exec(message);
  if (execCommand !== null) {
    if (execCommand[1] === '!') {
      commandHandler(execCommand[0], user, message);
    }
  }

  var callEmoteDB = function(emoteObject) {
    for (var emote in emoteObject) {
      emoteHandler(emote, emoteObject[emote], user, message);
    }
  };

  var words = message.split(' ');
  var emoteObject = {};

  for (var emote in globalEmotes) {
    for (var i = 0; i < words.length; i++) {
      if (words[i] === emote) {
        if(emoteObject.hasOwnProperty(emote)) {
          emoteObject[emote]++;
        } else {
          emoteObject[emote] = 1;
        }
      }
    }
  }
  callEmoteDB(emoteObject);

  // Sub Emotes
  var subEmoteDB = function(foundEmote, amount) {
    db.SubEmotes.findOrCreate(
      {where:
        { emote: foundEmote },
    }).spread(function(emoteCount) {
      emoteCount.increment('count', {by: amount});
      db.SubEmotes
      .update({
        lastMsg: message,
        lastUser: user
      }, {
        where: {
          emote: foundEmote
        }
      }
      );
    });
  };

  var callSubEmoteDB = function(subEmoteObject) {
    for (var emote in subEmoteObject) {
      subEmoteHandler(emote, emoteObject[emote], user, message);
    }
  };

  var subEmoteObject = {};

  for (var subEmote in subEmotes) {
    for (var e = 0; e < words.length; e++) {
      if (words[e] === subEmote) {
        console.log('Found ' + subEmote);
        if(subEmoteObject.hasOwnProperty(subEmote)) {
          subEmoteObject[subEmote]++;
        } else {
          subEmoteObject[subEmote] = 1;
        }
      }
    }
  }
  callSubEmoteDB(subEmoteObject);

  var callBttvEmoteDB = function(emoteObject) {
    for (var emote in emoteObject) {
      bttvEmoteHandler(emote, emoteObject[emote], user, message);
    }
  };

  var bttvEmoteObject = {};

  for (var bttvEmote in bttvEmotes) {
    for (var f = 0; f < words.length; f++) {
      if (words[f] === bttvEmote) {
        console.log('Found ' + bttvEmote);
        if(bttvEmoteObject.hasOwnProperty(bttvEmote)) {
          bttvEmoteObject[bttvEmote]++;
        } else {
          bttvEmoteObject[bttvEmote] = 1;
        }
      }
    }
  }
  callBttvEmoteDB(bttvEmoteObject);

  //User Handler
  userHandler(user, message);
};
