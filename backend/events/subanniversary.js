var minuteToHour = require('../utils/minutetohour');
var subMode = require('../utils/submode');

module.exports = function(client, io) {
  client.addListener('subanniversary', function (channel, user, message) {
    subMode(10);
    Users.findOne({ where: {name: username} }).then(function(subAUser) {
      client.say('MaSsanSC', 'xanHY xanPE Welcome back to the hood ' + username + '! Subbed for '+ months + " months You've written " + subAUser.count + " lines of text so far and been in chat for " + minuteToHour(subAUser.watchedTime) + " hours xanLove");
    });
  });
};
