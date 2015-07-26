var q = require('q');
var request = require('request');
var logger = require('../utils/logger');
var config = require('../config');

var emotesGlobal = {};
var emotesSubscriber = {};
var emotesBetterttv = {};

var emoteURL = {
  global: 'https://twitchemotes.com/api_cache/v2/global.json',
  subscriber: 'https://twitchemotes.com/api_cache/v2/subscriber.json',
  betterttv: 'https://cdn.betterttv.net/emotes/emotes.json'
};

function download(url, callback) {
  var deferred = q.defer();
  request(url, function(err, res, body) {
    if (!err && res.statusCode === 200) {
      deferred.resolve(res);
    } else {
      deferred.reject(err);
    }
  });
  return deferred.promise;
}

function parseGlobal(obj) {
  obj = obj.body;
  obj = JSON.parse(obj);
  var newObj = {};
  for (var emote in obj.emotes) {
    newObj[emote] = obj.emotes[emote].image_id;
  }
  return newObj;
}


function parseSubscriber(obj) {
  var newObj = {};
  for (var emote in obj.emotes) {
    newObj[emote] = obj.emotes[emote].image_id;
  }
  return newObj;
}

q.all([
  download(emoteURL.global),
  download(emoteURL.subscriber),
  download(emoteURL.betterttv),
]).spread(function (resGlobal, resSubscriber, resBetterttv) {
  if(resGlobal){
    logger.info('Response for global emotes');
    emotesGlobal = parseGlobal(resGlobal);
  }
  if(resSubscriber){
    logger.info('Response for subscriber emotes');

  }
  if(resBetterttv){
    logger.info('Response for Betterttv emotes');
  }
}).then(function(){
  logger.info('Emotes are done');
  console.log(emotesGlobal);
});

module.exports = {
  globalEmotes: emotesGlobal,
  subEmotes: emotesSubscriber,
  bttvEmotes: emotesBetterttv
};
