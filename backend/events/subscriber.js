var minuteToHour = require('../utils/minutetohour');

module.exports = function(client, io, db) {

  client.on("subscription", function (channel, username) {
    client.subscribers(channel).then(function() {
      setTimeout(function () {
        client.subscribersoff(channel);
      }, 10*1000);
    });
    db.Users.findOne({ where: {name: username} }).then(function(sub) {
      if(typeof sub !== 'undefined') {
        client.say(channel, 'xanHY xanPE Welcome to the hood ' + username + " You've written " + sub.count + " lines of text so far and been in chat for " + minuteToHour(sub.watchedTime) + " hours xanLove");
      } else {
        client.say(channel, "xanHY xanPE Welcome to the hood" + username +" You've written 0 Lines of text so far xanLove");
      }
    });
  });
};
