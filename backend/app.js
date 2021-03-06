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
    logger = require('./utils/logger'),
    config = require('./config'),
    fs = require('fs'),
    initial = require('./handlers/initial.js')(io, db),
    morgan = require('morgan');

    app.use(morgan('dev'));
    var cors = require('cors');


app.get('/', function(req, res){
  res.json({
    status: 200,
    message: 'if i had some duct tape i could fix that',
  });
});

app.get('/lookup/:user', cors(), function(req, res){
  db.Users.findOne({ where: {name: req.params.user} }).then(function(user) {
    res.json({
      user: user
    });
  });
});

var client = new irc.client(config.tmi);
client.connect();

client.addListener('connected', function (address, port) {
  logger.info('Connected to Twitch IRC on ' + address + ':' + port);
});

client.addListener('connectedfail', function (address, port) {
  logger.error('Unable to connect to Twitch IRC on ' + address + ':' + port);
});

client.addListener('crash', function(adress, port) {
  logger.error('Crash happend on ' + adress + ':' + port);
});

client.addListener('disconnected', function (reason) {
  logger.error('Disconnect: ' + reason);
});



var watchedTime = require('./handlers/watchedTime.js')(client, db);

db.sequelize.sync().then(function () {
  http.listen(config.port, function(){
    logger.info('Connection Successful: listening on *:' + config.port);
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
