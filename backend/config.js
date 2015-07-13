var identity = {
  name: ['izlbot'],
  channels: ['stylerdev'],
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

var port = 3000;

module.exports = {
  tmi: tmi,
  identity: identity,
  port: port
};

// database
// this.host = 'localhost';
// this.user = 'root';
// this.pass = 'gaffet';
// this.database = 'ChatStats';
