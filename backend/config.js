var identity = {
  name: ['izlbot'],
  channels: ['stylerdev', 'massansc'],
  oauth: 'oauth:vjfg2k6x1iwbeo9kt4v8ah9j8v8oxk',
};

var tmi = {
  options: {
    debug: true
  },
  connection: {
    random: "chat",
    reconnect: true
  },
  identity: {
    username: identity.name,
    password: identity.oauth
  },
  channels: identity.channels
};
var database = {
  host: 'localhost',
  user: 'root',
  pass: 'gaffet',
  database: 'chatstats'
};

var port = 3000;

module.exports = {
  tmi: tmi,
  identity: identity,
  port: port,
  database: database
};
