var chatstats = {
  // Rows queried per stat counter
  queryBuffer: 50,

  counters: {
    // This will enable custom emote per minute counters.
    'kappa':    false,
    'pogchamp': false,
    'xd':       true
  }
};

var identity = {
  name: ['izlbot'],
  channels: ['stylerdev'],
  oauth: 'oauth:vjfg2k6x1iwbeo9kt4v8ah9j8v8oxk',
};

var ignoredBots = ['nightbot','moobot','ohbot','izlbot'];

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
  pass: '',
  database: 'chatstats'
};

var port = 3000;

module.exports = {
  chatstats: chatstats,
  tmi: tmi,
  identity: identity,
  bots: ignoredBots,
  port: port,
  database: database
};
