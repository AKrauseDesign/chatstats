var userHandler     = require('./users');
var hashtagHandler  = require('./hashtags');
var emoteHandler    = require('./emotes');
var subEmoteHandler = require('./subEmotes');
var commandHandler  = require('./commands');
var request         = require('request');
var kpmodule        = require('../handlers/kpm');

var globalEmotes = [];
var subEmotes = [
  {
    id: 6115,
    code: 'masDoge'
  },
  {
    id: 10367,
    code: 'masBM'
  },
  {
    id: 12760,
    code: 'masGasm'
  },
  {
    id: 35600,
    code: 'masKappa'
  },
  {
    id: 35601,
    code: 'masW'
  },
  {
    id: 54064,
    code: 'masThump'
  },
  {
    id: 54065,
    code: 'masHey'
  },
  {
    id: 54395,
    code: 'masGame'
  },
  {
    id: 54371,
    code: 'masFail'
  },
  {
    id: 54370,
    code: 'masC'
  }
];
// request('https://api.twitch.tv/kraken/chat/massansc/emoticons', function(err, res, body) {
//   console.warn('Fired request');
//   if(!err && res.statusCode === 200) {
//     emotes = JSON.parse(body);
//     emotes = emotes.emoticons;
//     for (var emote in emotes) {
//       if (emotes[emote].subscriber_only === true) {
//         subEmotes.push(emotes[emote]);
//       } else {
//         globalEmotes.push(emotes[emote]);
//       }
//     }
//   } else {
//     console.error('Couldn\'t get subscriber emotes.');
//   }
// });

request('http://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0', function(err, res, body) {
// request('http://api.twitch.tv/kraken/chat/emoticon_images', function(err, res, body) {
  if (!err && res.statusCode === 200) {
    globalEmotes = JSON.parse(body);
    globalEmotes = globalEmotes.emoticon_sets[0];
    allEmotes = subEmotes.concat(globalEmotes);
  }
});

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




  // WIP EMOTES
  // var formatEmotes = function(emotes) {
  //   for(var emote in emotes) {
  //     for(var i = 0; i < subEmotes.length; i++) {
  //       if (emote === subEmotes[i].regex) {
  //         // TODO: Hook up to Massan's channel to see if this works
  //         // This will insert it into the submote DB but also in the normal emote DB, we need to prevent that from happening still in some way
  //         subEmoteHandler(emote, emotes[emote].length, user, message);
  //       }
  //     }
  //     var subStrArray = emotes[emote];
  //     if(emoteObject.hasOwnProperty(emote)) {
  //       emoteObject[emote] =+ subStrArray.length;
  //     } else {
  //       emoteObject[emote] = subStrArray.length;
  //     }
  //   }
  // };
  //
  // var callEmoteDB = function(emoteObject) {
  //   for (var emote in emoteObject) {
  //     emoteHandler(emote, emoteObject[emote], user, message);
  //   }
  // };
  // callEmoteDB(emoteObject);

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
    var name = globalEmotes[current].code;
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
