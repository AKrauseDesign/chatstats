module.exports = function(client, db) {
  var users = {};

  client.addListener('join', function (channel, username) {
    console.log('JOINED: '+username);
    users[username] = Date.now();
  });

  client.addListener('part', function (channel, username) {
    var now = Date.now();
    var joined = users[username];
    var watched = now - joined;
    delete users[username];
    if(users[username] === null || users[username] === undefined) {
      var time = Math.round(watched / 1000 / 60);
      db.Users.findOrCreate(
        {where:
          { name: username },
      }).spread(function(user) {
        user.increment('watchedTime', {by: time});
        console.log('Watchedtime: '+username+' By: '+time+' min');
      });
    } else {
      console.log('Bailing out, you are on your own. Good luck!');}
  });
};
