var userHandler = require('../handlers/users.js');
var hashtagHandler = require('../handlers/hashtags.js');
var emoteHandler = require('../handlers/emotes.js');
var commandHandler = require('../handlers/commands.js');
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
