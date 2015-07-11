'use strict';
// _______ _______ __   __ ___     _______ ______   ______  _______ __   __    ___ _______
// |       |       |  | |  |   |   |       |    _ | |      ||       |  | |  |  |   |       |
// |  _____|_     _|  |_|  |   |   |    ___|   | || |  _    |    ___|  |_|  |  |   |   _   |
// | |_____  |   | |       |   |   |   |___|   |_||_| | |   |   |___|       |  |   |  | |  |
// |_____  | |   | |_     _|   |___|    ___|    __  | |_|   |    ___|       ___|   |  |_|  |
//  _____| | |   |   |   | |       |   |___|   |  | |       |   |___ |     |   |   |       |
// |_______| |___|   |___| |_______|_______|___|  |_|______||_______| |___||___|___|_______|


// Dependencies
var irc = require("tmi.js"),
    mongoose = require('mongoose'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    config = require('./config.js'),
    handler = require('./handlers.js'),
    fs = require('fs'),
    morgan = require('morgan');
    app.use(morgan('dev'));

// TMI Config
var options = {
    options: {
        debug: true
    },
    connection: {
        random: "chat",
        reconnect: true
    },
    identity: {
        username: config.name,
        password: config.oauth
    },
    channels: config.channels
};

var client = new irc.client(options);
client.connect();
http.listen(3000, function(){
  console.log('Connection Successful: listening on *:3000');
});


// ----------------------------------------- //
// Event listeners

client.addListener('chat', handler.chat);
client.addListener('timeout', handler.timeout);

client.addListener('subscriber', handler.subscriber);
client.addListener('subanniversary', handler.subanniversary);

// ----------------------------------------- //
// Models

if (fs.existsSync('./handler')) {
  fs.readdirSync('./handler/').forEach(function (file) {
    if (!(/(^|.\/)\.+[^\/\.]/g).test(file)) {
      require('./handler/' + file)(client, io);
    }
  });
}
