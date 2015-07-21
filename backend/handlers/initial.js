var request         = require('request');
var kpmodule        = require('../handlers/kpm');
module.exports = function(io, db) {
  var totalMessages,totalHours;
  db.Users.sum('count').then(function(sum) {
    totalMessages = sum;
  });


  var allEmotes;
  var globalEmotes = [];
  var sEmotes = [
    {
      id: 6115,
      code: 'masDoge'
    },
    {
      id: 10367,
      code: 'masBM'
    },
    {
      id: 12760,
      code: 'masGasm'
    },
    {
      id: 35600,
      code: 'masKappa'
    },
    {
      id: 35601,
      code: 'masW'
    },
    {
      id: 54064,
      code: 'masThump'
    },
    {
      id: 54065,
      code: 'masHey'
    },
    {
      id: 54395,
      code: 'masGame'
    },
    {
      id: 54371,
      code: 'masFail'
    },
    {
      id: 54370,
      code: 'masC'
    }
  ];
  request('http://api.twitch.tv/kraken/chat/emoticon_images?emotesets=0', function(err, res, body) {
  // request('http://api.twitch.tv/kraken/chat/emoticon_images', function(err, res, body) {
    if (!err && res.statusCode === 200) {
      globalEmotes = JSON.parse(body);
      globalEmotes = globalEmotes.emoticon_sets[0];
      allEmotes = sEmotes.concat(globalEmotes);
    }
  });

	io.on('connection', function(socket) {
    var users = [];
    var commands = [];
    var emotes = [];
    var subEmotes = [];
    var hashtags = [];
    db.Users.sum('watchedTime').then(function(sum){
      totalHours = sum;
    });
		db.Subemotes.findAll({
			limit: 40,
			order: 'count DESC'
		}).then(function(subemote) {
			for (var i in subemote) {
				subEmotes.push({
					emote: subemote[i].emote,
					lastUser: subemote[i].lastUser,
					lastMsg: subemote[i].lastMsg,
					lastMsgDate: subemote[i].updatedAt,
					count: subemote[i].count
				});
			}
		}).then(function() {
			db.Emotes.findAll({
				limit: 40,
				order: 'count DESC'
			}).then(function(emote) {
				for (var i in emote) {
					emotes.push({
						emote: emote[i].emote,
						lastUser: emote[i].lastUser,
						lastMsg: emote[i].lastMsg,
						lastMsgDate: emote[i].updatedAt,
						count: emote[i].count
					});
				}
			});
		}).then(function() {
			db.Hashtags.findAll({
				limit: 40,
				order: 'count DESC'
			}).then(function(hashtag) {
				for (var i in hashtag) {
					hashtags.push({
						hashtag: hashtag[i].hashtag,
						lastUser: hashtag[i].lastUser,
						lastMsg: hashtag[i].lastMsg,
						lastMsgDate: hashtag[i].updatedAt,
						count: hashtag[i].count
					});
				}
			});
		}).then(function() {
			db.Commands.findAll({
				limit: 40,
				order: 'count DESC'
			}).then(function(command) {
				for (var i in command) {
					commands.push({
						command: command[i].command,
						lastUser: command[i].lastUser,
						lastMsg: command[i].lastMsg,
						lastMsgDate: command[i].updatedAt,
						count: command[i].count
					});
				}
			});
		}).then(function() {
			db.Users.findAll({
				limit: 40,
				order: 'count DESC'
			}).then(function(user) {
				for (var i in user) {
					users.push({
						name: user[i].name,
						lastMsg: user[i].lastMsg,
						lastMsgDate: user[i].updatedAt,
						count: user[i].count
					});
				}
			}).then(function() {
				socket.emit('initial', {
					kpm: kpmodule.get(),
					totalMessages: totalMessages,
          totalWatched: totalHours,
					users: users,
					commands: commands,
					emotes: emotes,
					subemotes: subEmotes,
					hashtags: hashtags,
          globalEmotes: allEmotes
				});
			});
		});
	});
};
