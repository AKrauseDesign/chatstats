var currentCombo = 2;
var comboEvent = 'subscriber-combo';

module.exports = function(client, io) {
  var countdown = setTimeout(function() {
    currentCombo = 0;
    io.emit(comboEvent, {
      combo: -1,
      lastSubscriber: null
    });
  }, 60 * 1000);

  client.addListener('subscriber', function (channel, user, message) {
    currentCombo++;
    if (currentCombo > 1) {
      io.emit(comboEvent, {
        combo: currentCombo,
        lastSubscriber: user['display-name']
      });
    }
  });
};
