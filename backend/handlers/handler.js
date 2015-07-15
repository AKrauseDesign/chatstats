var userHandler = require('../handlers/users.js');
var hashtagHandler = require('../handlers/hashtags.js');
var emoteHandler = require('../handlers/emotes.js');
var commandHandler = require('../handlers/commands.js');
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

  // Emote Handler
  var formatEmotes = function(text, emotes) {
    var splitText = text.split('');
    for(var i in emotes) {
      var e = emotes[i];
      for(var j in e) {
        var subStr = e[j];
        if(typeof subStr == 'string') {
          subStr = subStr.split('-');
          subStr = [parseInt(subStr[0]), parseInt(subStr[1])];
          var length = subStr[1] - subStr[0];
          var empty = Array.apply(null, new Array(length + 1)).map(function() {return '';});
          splitText = splitText.slice(0, subStr[0]).concat(empty).concat(splitText.slice(subStr[1] + 1, splitText.length));
        }
      }
    }
    return splitText.join('');
  };

  console.log(formatEmotes(message, userObj.emotes));
  // User Handler
  userHandler(user, message);
};
