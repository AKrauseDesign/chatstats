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


/*
var callDB = function(emoteObject) {
  for (var emote in emoteObject) {
    emoteDB(emote, emoteObject[emote]);
  }
};

var words = message.split(' ');
var emoteObject = {};

for (var current = 0; current < globalEmotes.length; current++) {
  var id = globalEmotes[current].id;
  for (var i = 0; i < words.length; i++) {
    if (words[i] === globalEmotes[current].code) {
      if(emoteObject.hasOwnProperty(id)) {
        emoteObject[id]++;
      } else {
        emoteObject[id] = 1;
      }
    }
  }
}

callDB(emoteObject);


*/
