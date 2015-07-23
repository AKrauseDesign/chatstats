var minuteToHour = require('../utils/minutetohour');
var repeat  = 10000;

module.exports = function(client, io, db) {
  client.addListener('subanniversary', function (channel, username, months) {
    client.subscribers(channel).then(function() {
      setTimeout(function () {
        client.subscribersoff(channel);
      }, repeat);
    });
    db.Users.findOne({ where: {name: username} }).then(function(sub) {
      client.say(channel, 'xanHY xanPE Welcome back to the hood ' + username + '! Subbed for '+ months + " months You've written " + sub.count + " lines of text so far and been in chat for " + minuteToHour(sub.watchedTime) + " hours xanLove");
    });
  });
};
