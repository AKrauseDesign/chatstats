module.exports = function(user, message, client, db) {
  var bots = ['nightbot', 'moobot', 'xanbot'];
  console.log(message);
  if(user.username !== bots[0] || bots[1] || bots[2]) {
    return false;
  }


};
