var currentCombo = 0;
var comboEvent = 'subscriber-combo';
var minuteToHour = require('../utils/minutetohour');

module.exports = function(client, io, db) {
  var countdown = setTimeout(function() {
    currentCombo = 0;
    io.emit(comboEvent, {
      combo: -1,
      lastSubscriber: null
    });
  }, 60 * 1000);

  client.addListener('subscriber', function (channel, username) {
    client.subscribers(channel).then(function() {
      setTimeout(function () {
        client.subscribersoff(channel);
      }, 10*1000);
    });
    db.Users.findOne({ where: {name: username} }).then(function(sub) {
      if(!subUser) {
        client.say('MaSsanSC', "xanHY xanPE Welcome to the hood" + username +" You've written 0 Lines of text so far xanLove");
      } else {
        client.say('MaSsanSC', 'xanHY xanPE Welcome to the hood ' + username + " You've written " + sub.count + " lines of text so far and been in chat for " + minuteToHour(sub.watchedTime) + " hours xanLove");
      }
    });

    currentCombo++;
    if (currentCombo > 1) {
      io.emit(comboEvent, {
        combo: currentCombo,
        lastSubscriber: username
      });
    }
  });
};
