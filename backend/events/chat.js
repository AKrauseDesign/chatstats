var handler   = require('../handlers/handler');
var kpmodule       = require('../handlers/kpm');
var initial   = require('../handlers/initial');

module.exports = function(client, io, db) {
  var totalMessages;

  db.Users.sum('count').then(function(sum) {
    totalMessages = sum;
  });

  client.addListener('chat', function (channel, user, message) {
    totalMessages++;
    // Global Database Handler
    handler(user, message);

    var username;
    if(user['display-name'] === null) {
      username = user.username;
    } else {
      username = user['display-name'];
    }

    var dev = false;
    if(user.username === 'darkoe123' || user.username === 'stylerdev' || user.username === 'timohstudios') {
      dev = true;
    }
    io.emit('stats', {
      user: {
        name: username,
        color: user.color,
        dev: dev,
        mod: user['user-type'],
        sub: user.subscriber,
        turbo: user.turbo
      },
      msg: message,
      total: totalMessages,
      kpm: kpmodule.get(),
      date: Date.now()
    });
  });
};
