module.exports = function(client, io) {
  client.addListener('chat', function (channel, user, message) {
    io.emit('stats', {
      user: {
        user: user['display-name'],
        color: user.color,
        sub : user.subscriber,
        turbo: user.turbo
      },
      msg: message,
      kpm: KPM,
      date: Date.now()
    });
  });
};
