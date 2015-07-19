var currentCombo = 0;
var comboEvent = 'subscriber-combo';
var minuteToHour = require('../utils/minutetohour');
var subMode = require('../utils/submode');

module.exports = function(client, io) {
  var countdown = setTimeout(function() {
    currentCombo = 0;
    io.emit(comboEvent, {
      combo: -1,
      lastSubscriber: null
    });
  }, 60 * 1000);

  client.addListener('subscriber', function (channel, user, message) {
    subMode(10);
    Users.findOne({ where: {name: username} }).then(function(subUser) {
      if(!subUser) {
        client.say('MaSsanSC', "xanHY xanPE Welcome to the hood" + user['display-name'] +" You've written 0 Lines of text so far xanLove");
      } else {
        client.say('MaSsanSC', 'xanHY xanPE Welcome to the hood ' + user['display-name'] + " You've written " + subUser.count + " lines of text so far and been in chat for " + minuteToHour(subUser.watchedTime) + " hours xanLove");
      }
    });

    currentCombo++;
    if (currentCombo > 1) {
      io.emit(comboEvent, {
        combo: currentCombo,
        lastSubscriber: user['display-name']
      });
    }
  });
};
