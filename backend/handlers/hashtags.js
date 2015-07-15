var db = require('../models/');
module.exports = function(hashtag, user, message){
  db.Hashtags.findOrCreate(
    {where:
      { hashtag: hashtag },
  }).spread(function(user1) {
    user1.increment('count', {by: 1});
    db.Hashtags
    .update({
      lastMsg: message,
      lastUser: user
    }, {
      where: {
        hashtag: hashtag
      }
    }
    );
  });
};
