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
    db = require("./models"),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    request = require('request'),
    config = require('./config'),
    fs = require('fs'),
    initial = require('./handlers/initial.js')(client, io, db),
    morgan = require('morgan');

    app.use(morgan('dev'));


app.get('/', function(req, res){
  res.json({
    status: 200,
    message: 'if i had some duct tape i could fix that',
  });
});

var client = new irc.client(config.tmi);
client.connect();

db.sequelize.sync().then(function () {
  http.listen(config.port, function(){
    console.log('Connection Successful: listening on *:' + config.port);
  });
});
if (fs.existsSync('./events')) {
  fs.readdirSync('./events').forEach(function(file) {
    require('./events/' + file)(client, io, db);
  });
}
if (fs.existsSync('./commands')) {
  fs.readdirSync('./commands').forEach(function(file) {
    require('./commands/' + file)(client, db, request);
  });
}
