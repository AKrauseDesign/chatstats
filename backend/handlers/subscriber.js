module.exports = function(client, io) {
  client.addListener('subscriber', function (channel, user, message) {
    io.emit('search', {
      test: 'dank memes'
    });
    console.log('emit done');
  });
};
