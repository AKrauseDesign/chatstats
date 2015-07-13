'use strict';
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

// Temp Vars
var KPM = 0;

module.exports.chat = function(channel, user, message, self){
  io.emit('stats', {
    user: {
      user: user['display-name'],
      color: user.color,
      sub : user.subscriber,
      turbo: user.turbo
    },
    msg: message,
    kpm: KPM,
    date: Date.now()
  });
};

module.exports.timeout = function(channel, username){
  console.log('123');
};

module.exports.subscriber = function(channel, username){
  console.log('123');
};

module.exports.subanniversary = function(channel, username, months){
  console.log('123');
};
