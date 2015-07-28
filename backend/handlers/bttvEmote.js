var db = require('../models/');

module.exports = function(foundEmote, amount, user, message) {
  db.Bttvemotes.findOrCreate(
    {where:
      { emote: foundEmote },
  }).spread(function(emoteCount) {
    emoteCount.increment('count', {by: amount});
    db.Bttvemotes
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
