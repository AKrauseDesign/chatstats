var q = require('q');
var request = require('request');
var logger = require('../utils/logger');
var config = require('../config');

// var channel = config.identity.channels[0];
var channel = 'massansc';

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
    if(typeof emote !== 'undefined') {
      newObj[emote] = obj.emotes[emote].image_id;
    }
  }
  return newObj;
}

function parseSubscriber(obj) {
  obj = JSON.parse(obj);
  var newObj = {};
  for (var i in obj.channels[channel].emotes) {
    var j = obj.channels[channel].emotes[i];
    if(typeof j.code !== 'undefined') {
      newObj[j.code] = j.image_id;
    }
  }
  return newObj;
}

function parseBttv(obj) {
  obj = JSON.parse(obj);
  var newObj = {};
  for (var emote in obj) {
    if(typeof obj[emote].regex !== 'undefined') {
      newObj[obj[emote].regex] = obj[emote].url;
    }
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
        defer.reject('Global Emotes');
      }
    });
    return defer.promise;
  },
  getSubscriberEmotes: function(){
    var defer = q.defer();
    request(emoteURL.subscriber, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        defer.resolve(parseSubscriber(body));
      } else {
        defer.reject('Subscriber Emotes');
      }
    });
    return defer.promise;
  },
  getBttvEmotes: function(){
    var defer = q.defer();
    request(emoteURL.betterttv, function(err, res, body) {
      if (!err && res.statusCode === 200) {
        defer.resolve(parseBttv(body));
      } else {
        defer.reject('BTTV Emotes');
      }
    });
    return defer.promise;
  }
};
