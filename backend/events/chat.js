var handler   = require('../handlers/handler');
var kpmodule       = require('../handlers/kpm');
var initial   = require('../handlers/initial');
var inArray = require('../utils/inArray');

module.exports = function(client, io, db) {
  var totalMessages;

  db.Users.sum('count').then(function(sum) {
    totalMessages = sum;
  });

  var devs = ['darkoe123', 'stylerdev', 'timohstudios'];
  var bots = ['nightbot', 'moobot', 'xanbot','ohbot'];
  client.addListener('chat', function (channel, user, message) {
    if(inArray(user.username, bots)) {
      console.log('Bot Message');
    } else {
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
      if(inArray(user.username, devs)) {
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
    }
  });
};
