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
  var newObj = {};
  for (var emote in emotes) {
    newObj[emote] = obj.emotes[emote].image_id;
  }
  return newObj;
}

q.all([
  download(emoteURL.global),
  download(emoteURL.subscriber),
  download(emoteURL.betterttv),
]).spread(function (resGlobal, resSubscriber, resBetterttv) {
  emotesGlobal(parseGlobal.body)
  if(resGlobal){
    console.log('resGlobal');
  }
  if(resSubscriber){
    console.log('resSubscriber');
  }
  if(resBetterttv){
    console.log('resBetterttv');
  }
});

module.exports = {
  emotesGlobal: emotesGlobal,
  emotesSubscriber: emotesSubscriber,
  emotesBetterttv: emotesBetterttv
};
