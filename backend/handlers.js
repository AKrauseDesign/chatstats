'use strict';
var app = require('express')(),
http = require('http').Server(app),
io = require('socket.io')(http);

// Temp Vars
var KPM = 0;

module.exports = {
  chat: function(channel, user, message, self){
    console.log(user);
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
  },

  timeout: function(channel, username){

  },
  subscriber: function(channel, username){

  },
  subanniversary: function(channel, username, months){

  }
}
