var db = require('../models/');
module.exports = function(command, user, message){
  db.Commands.findOrCreate(
    {where:
      { command: command },
  }).spread(function(user1) {
    user1.increment('count', {by: 1});
    db.Commands
    .update({
      lastMsg: message,
      lastUser: user
    }, {
      where: {
        command: command
      }
    }
    );
  });
};
