module.exports = function(client, io) {
  client.addListener('subanniversary', function (channel, user, message) {
    io.emit('search', {
      test: 'dank memes'
    });
  });
};
