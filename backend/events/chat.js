var handler  = require('../handlers/handler.js');

module.exports = function(client, io, db) {
  var kpm = 0;
  var total = 0;
  client.addListener('chat', function (channel, user, message) {

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
      total: total,
      kpm: kpm,
      date: Date.now()
    });
  });
};
