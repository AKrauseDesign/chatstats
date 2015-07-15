module.exports = function(client, db) {

};
module.exports.hashtags = function(user, message){
  Hashtags.findOrCreate(
    {where:
      { hashtag: execHash[0] },
  }).spread(function(user1) {
    user1.increment('count', {by: 1});
    Hashtags
    .update({
      lastMsg: message,
      lastUser: user.username
    }, {
      where: {
        hashtag: execHash[0]
      }
    }
    );
  });
};
