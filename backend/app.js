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
    config = require('./config'),
    fs = require('fs'),
    morgan = require('morgan');

    app.use(morgan('dev'));


var client = new irc.client(config.tmi);
client.connect();
http.listen(config.port, function(){
  console.log('Connection Successful: listening on *:' + config.port);
});

if (fs.existsSync('./handlers')) {
  fs.readdirSync('./handlers').forEach(function(file) {
    require('./handlers/' + file)(client, io);
  });
}
