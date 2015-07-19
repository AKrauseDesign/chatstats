module.exports = function(time) {
  client.subscribers('MaSsanSC').then(function() {
    setTimeout(function () {
      client.subscribersoff('MaSsanSC');
    }, time*1000);
  });
};
