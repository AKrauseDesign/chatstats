var db = require('../models/');
module.exports = function(command, user, message){
  db.Users.findOrCreate(
    {where:
      { name: user },
      defaults: {lastMsg: message}
    }).spread(function(user1) { user1.increment('count', {by: 1});
    db.Users.update({
      lastMsg: message,
    },{ where: { name: user }});
  });
};
