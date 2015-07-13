module.exports = function(client, io) {
  client.addListener('timeout', function (channel, user, message) {
    console.log(user);
  });
};
