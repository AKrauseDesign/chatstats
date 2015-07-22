var userHandler     = require('./users');
var hashtagHandler  = require('./hashtags');
var emoteHandler    = require('./emotes');
var subEmoteHandler = require('./subEmotes');
var commandHandler  = require('./commands');
var request         = require('request');
var kpmodule        = require('./kpm');
var data            = require('./startup');

var globalEmotes = data.globalEmotes;
var subEmotes = data.subEmotes;

module.exports = function(userObj, message) {
  var user = userObj['display-name'];

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


  // Emotes

  var emoteDB = function(foundEmote, amount) {
    db.Emotes.findOrCreate(
      {where:
        { emote: foundEmote },
    }).spread(function(emoteCount) {
      emoteCount.increment('count', {by: amount});
      db.Emotes
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

  var callEmoteDB = function(emoteObject) {
    for (var emote in emoteObject) {
      emoteHandler(emote, emoteObject[emote], user, message);
      if(emote === 'Kappa') {
        kpmodule.set(emoteObject[emote]);
      }
    }
  };

  var words = message.split(' ');
  var emoteObject = {};

  for (var current = 0; current < globalEmotes.length; current++) {
    var name = globalEmotes[current].regex;
    for (var i = 0; i < words.length; i++) {
      if (words[i] === name) {
        if(emoteObject.hasOwnProperty(name)) {
          emoteObject[name]++;
        } else {
          emoteObject[name] = 1;
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
    var subname = subEmotes[subcurrent].code;
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

  // User Handler
  userHandler(user, message);
};
