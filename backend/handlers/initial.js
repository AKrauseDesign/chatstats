var request  = require('request');
var kpmodule = require('./kpm');
var data     = require('./startup');

module.exports = function(io, db) {
  var totalMessages, totalUsers, totalHours, allEmotes;
  db.Users.sum('count').then(function(sum) {
    totalMessages = sum;
  });
  db.Users.count().then(function(sum) {
    totalUsers = sum;
  });

	io.on('connection', function(socket) {

    console.log('Connection');

    if (allEmotes === undefined) {
      allEmotes = data.globalEmotes;
    }

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
            watchedTime: user[i].watchedTime,
						lastMsgDate: user[i].updatedAt,
						count: user[i].count
					});
				}
			}).then(function() {
				socket.emit('initial', {
          totalUsers: totalUsers,
					totalMessages: totalMessages,
          totalWatched: totalHours,
					users: users,
					commands: commands,
					emotes: emotes,
					subEmotes: subEmotes,
					hashtags: hashtags,
          allEmotes: allEmotes
				});
			});
		});
	});
};
