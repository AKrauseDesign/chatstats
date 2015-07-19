var db = require('../models/');
module.exports = function(foundEmote, amount, user, message) {
  db.Subemotes.findOrCreate(
    {where:
      { emote: foundEmote },
  }).spread(function(emoteCount) {
    emoteCount.increment('count', {by: amount});
    db.Subemotes
    .update({
      lastMsg: message,
      lastUser: user
    }, {
      where: {
        emote: foundEmote
      }
    }
    );
  });
};
