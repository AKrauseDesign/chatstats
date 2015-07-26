"use strict";

module.exports = function(sequelize, DataTypes) {
  var Bttvemotes = sequelize.define("Bttvemotes", {
    emote: {
      type: DataTypes.STRING
    },
    lastUser: {
      type: DataTypes.STRING
    },
    lastMsg: {
      type: DataTypes.TEXT
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Bttvemotes;
};
