var request = require('request');
var q = require('q');
var kpmodule = require('./kpm');
var data = require('./startup');
var config = require('../config');
var queryBuffer = config.chatstats.queryBuffer;

module.exports = function(io, db) {
	var totalMessages, totalUsers, totalHours, allEmotes, GlobalEmotes, SubEmotes, BttvEmotes;
  q.all([
    data.getGlobalEmotes(),
    data.getSubscriberEmotes(),
    data.getBttvEmotes()
  ]).spread(function(resGlobal, resSub, resBTTV) {
    GlobalEmotes = resGlobal;
    SubEmotes = resSub;
    BttvEmotes = resBTTV;
    allEmotes = GlobalEmotes.concat(SubEmotes);
  }).fail(function(err) {
    logger.error('Fetching: ' + err);
    return true;
  });

	io.on('connection', function(socket) {
		var users = [];
		var commands = [];
		var emotes = [];
		var subEmotes = [];
		var hashtags = [];

		q.all([
			db.Users.sum('count'),
			db.Users.count(),
			db.Users.sum('watchedTime'),
			db.Subemotes.findAll({
				limit: queryBuffer,
				order: 'count DESC'
			}),
			db.Emotes.findAll({
				limit: queryBuffer,
				order: 'count DESC'
			}),
			db.Hashtags.findAll({
				limit: queryBuffer,
				order: 'count DESC'
			}),
			db.Commands.findAll({
				limit: queryBuffer,
				order: 'count DESC'
			}),
			db.Users.findAll({
				limit: queryBuffer,
				order: 'count DESC'
			})
		]).spread(function(messageCount, userCount, timeCount, subemote, emote, hashtag, command, user) {

      totalMessages = messageCount;
      totalUsers    = userCount;
      totalHours    = timeCount;

      for (var se in subemote) {
				subEmotes.push({
					emote: subemote[se].emote,
					lastUser: subemote[se].lastUser,
					lastMsg: subemote[se].lastMsg,
					lastMsgDate: subemote[se].updatedAt,
					count: subemote[se].count
				});
			}
			for (var e in emote) {
				emotes.push({
					emote: emote[e].emote,
					lastUser: emote[e].lastUser,
					lastMsg: emote[e].lastMsg,
					lastMsgDate: emote[e].updatedAt,
					count: emote[e].count
				});
			}
			for (var h in hashtag) {
				hashtags.push({
					hashtag: hashtag[h].hashtag,
					lastUser: hashtag[h].lastUser,
					lastMsg: hashtag[h].lastMsg,
					lastMsgDate: hashtag[h].updatedAt,
					count: hashtag[h].count
				});
			}
			for (var c in command) {
				commands.push({
					command: command[c].command,
					lastUser: command[c].lastUser,
					lastMsg: command[c].lastMsg,
					lastMsgDate: command[c].updatedAt,
					count: command[c].count
				});
			}
			for (var u in user) {
				users.push({
					name: user[u].name,
					lastMsg: user[u].lastMsg,
					watchedTime: user[u].watchedTime,
					lastMsgDate: user[u].updatedAt,
					count: user[u].count
				});
			}
		}).then(function(data) {
      socket.emit('initial', {
        totalUsers: totalUsers,
        totalMessages: totalMessages,
        totalWatched: totalHours,
        users: users,
        commands: commands,
        emotes: emotes,
        hashtags: hashtags,
      });
		}).fail(function(err) {
      logger.error('Fetching: ' + err);
		});
	});
};
