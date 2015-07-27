var q               = require('q');
var userHandler     = require('./users');
var hashtagHandler  = require('./hashtags');
var emoteHandler    = require('./emotes');
var subEmoteHandler = require('./subEmotes');
var commandHandler  = require('./commands');
var request         = require('request');
var kpmodule        = require('./kpm');
var data            = require('./startup');
var logger          = require('../utils/logger');

var globalEmotes, subEmotes, Betterttv;
q.all([
  data.getGlobalEmotes(),
  data.getSubscriberEmotes(),
  data.getBttvEmotes()
]).spread(function(resGlobal, resSub, resBTTV){
  globalEmotes  = resGlobal;
  subEmotes     = resSub;
  Betterttv     = resBTTV;
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
    console.log(emote);
    for (var i = 0; i < words.length; i++) {
      if (words === emote) {
        console.log('Found ' + emote);
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

  for (var subcurrent = 0; subcurrent < subEmotes.length; subcurrent++) {
    var subname = subEmotes[subcurrent];
    for (var e = 0; e < words.length; e++) {
      if (words[e] === subname) {
        if(subEmoteObject.hasOwnProperty(subname)) {
          subEmoteObject[subname]++;
        } else {
          subEmoteObject[subname] = 1;
        }
      }
    }
  }

  callSubEmoteDB(subEmoteObject);

  //User Handler
  userHandler(user, message);
};
