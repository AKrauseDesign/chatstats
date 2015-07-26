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

function parseGlobal(obj) {
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
function parseBttv(obj) {
  var newObj = {};
  for (var emote in obj.emotes) {
    newObj[emote] = obj.emotes[emote].image_id;
  }
  return newObj;
}

module.exports = {
  getGlobalEmotes: function(){
    var defer = q.defer();
    request(emoteURL.global, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        defer.resolve(parseGlobal(body));
      } else {
        defer.reject(err);
      }
    });
    return defer.promise;
  },
  getSubscriberEmotes: function(){
    var defer = q.defer();
    request(emoteURL.global, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        defer.resolve(parseSubscriber(body));
      } else {
        defer.reject(err);
      }
    });
    return defer.promise;
  },
  getBttvEmotes: function(){
    var defer = q.defer();
    request(emoteURL.global, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        defer.resolve(parseBttv(body));
      } else {
        defer.reject(err);
      }
    });
    return defer.promise;
  }
};
