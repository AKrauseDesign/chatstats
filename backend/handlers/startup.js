var request = require('request');

var globalEmotes = [];
var subEmotes = [];

request('https://api.twitch.tv/kraken/chat/massansc/emoticons', function(err, res, body) {
  console.warn('Fired request');
  if(!err && res.statusCode === 200) {
    emotes = JSON.parse(body);
    emotes = emotes.emoticons;
    for (var emote in emotes) {
      if (emotes[emote].subscriber_only === true) {
        subEmotes.push(emotes[emote]);
      } else {
        globalEmotes.push(emotes[emote]);
      }
    }
  } else {
    console.error('Couldn\'t get emotes.');
  }
});

module.exports = {
  globalEmotes: globalEmotes,
  subEmotes: subEmotes
};
