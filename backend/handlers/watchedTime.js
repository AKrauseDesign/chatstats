module.exports = function(client, db) {
  var users = {};

  client.addListener('chat', function(channel, user, message) {
    if(message === '!test' && username === 'stylerdev' || username === 'timohstudios') {
      console.log(users);
    }
  });

  client.addListener('join', function (channel, username) {
    console.log('JOINED: '+username);
    users[username] = Date.now();
  });

  client.addListener('part', function (channel, username) {
    var now = Date.now();
    var joined = users[username];
    var watched = now - joined;
    delete users[username];
    console.log('LEFT: ' + username + '  WATCHED: ' + watched);
    if(users[username] === null || users[username] === undefined) {console.log('It works!');} else {console.log('NOPE!');}
    // TODO: Push watched to DB
    // SUGGESTION: Move this code to an event, make the handler the DB code
  });

};
