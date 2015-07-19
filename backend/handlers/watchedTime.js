module.exports = function(client, db) {
  var users = [];
  client.addListener('chat', function(channel, user, message) {
    if(message === '!test'){
      console.log(users);
    }
  });
  client.addListener('join', function (channel, username) {
    console.log('JOINED: '+username);
    users.push({
      user: username,
      date: Date.now()
    });
  });
  client.addListener('part', function (channel, username) {
    var index = users.indexOf(username);
    if (index > -1) {
      array.splice(index, 1);
    }
    console.log('LEFT: '+username+' '+index);
  });
};
