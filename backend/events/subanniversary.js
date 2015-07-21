var minuteToHour = require('../utils/minutetohour');

module.exports = function(client, io, db) {
  client.addListener('subanniversary', function (channel, user, message) {
    client.subscribers('MaSsanSC').then(function() {
      setTimeout(function () {
        client.subscribersoff('MaSsanSC');
      }, 10*1000);
    });
    db.Users.findOne({ where: {name: username} }).then(function(subAUser) {
      client.say('MaSsanSC', 'xanHY xanPE Welcome back to the hood ' + username + '! Subbed for '+ months + " months You've written " + subAUser.count + " lines of text so far and been in chat for " + minuteToHour(subAUser.watchedTime) + " hours xanLove");
    });
  });
};
