var logger = require('../utils/logger');

module.exports = function(client, db) {
  var users = {};

  client.addListener('join', function (channel, username) {
    logger.info('JOINED: '+username);
    users[username] = Date.now();
  });

  client.addListener('part', function (channel, username) {
    var now = Date.now();
    var joined = users[username];
    var watched = now - joined;
    delete users[username];
    var time = Math.round(watched / 1000 / 60);
    if (isNaN(time)) {return false;}
    db.Users.findOrCreate(
      {where:
        { name: username },
    }).spread(function(user) {
      user.increment('watchedTime', {by: time});
      logger.info('Watchedtime: '+username+' By: '+time+' min');
    });
  });
};
