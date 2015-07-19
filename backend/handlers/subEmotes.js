var db = require('../models/');
module.exports = function(foundEmote, amount, user, message) {
  db.Emotes.findOrCreate(
    {where:
      { emote: foundEmote },
  }).spread(function(emoteCount) {
    emoteCount.increment('count', {by: amount});
    db.Emotes
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
