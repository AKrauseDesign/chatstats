var userHandler = require('../handlers/users.js');
var hashtagHandler = require('../handlers/hashtags.js');
var emoteHandler = require('../handlers/emotes.js');
var commandHandler = require('../handlers/commands.js');
module.exports = function(user, message){

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

  // User Handler
  userHandler(user, message);
};
