var userHandler = require('./users.js');
var hashtagHandler = require('.hashtags.js');
var emoteHandler = require('./emotes.js');
var commandHandler = require('./commands.js');

var emotes = {};
var subEmotes = [];
request('https://api.twitch.tv/kraken/chat/massansc/emoticons', function(err, res, body) {
  console.warn('Fired request');
  if(!err && res.statusCode === 200) {
    emotes = JSON.parse(body);
    emotes = emotes.emoticons;
    for (var emote in emotes) {
      if (emotes[emote].subscriber_only === true) {
        subEmotes.push(emotes[emote]);
      }
    }
  } else {
    console.error('Couldn\'t get subscriber emotes.');
  }
});

module.exports = function(userObj, message) {
  var user = userObj['display-name'];
  var emoteObject = {};

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

  // Emote Handler
  var formatEmotes = function(emotes) {
    for(var emote in emotes) {
      for(var i = 0; i < subEmotes.length; i++) {
        if (emote === subEmotes[i].regex) {

        }
      }
      var subStrArray = emotes[emote];
      if(emoteObject.hasOwnProperty(emote)) {
        emoteObject[emote] =+ subStrArray.length;
      } else {
        emoteObject[emote] = subStrArray.length;
      }
    }
  };

  var callEmoteDB = function(emoteObject) {
    for (var emote in emoteObject) {
      emoteHandler(emote, emoteObject[emote], user, message);
    }
  };

  formatEmotes(userObj.emotes);
  callEmoteDB(emoteObject);

  // User Handler
  userHandler(user, message);
};
