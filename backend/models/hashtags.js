"use strict";

module.exports = function(sequelize, DataTypes) {
  var Hashtags = sequelize.define("Hashtags", {
    hashtag: {
      type: DataTypes.STRING
    },
    lastMsg: {
      type: DataTypes.TEXT
    },
    lastUser: {
      type: DataTypes.STRING
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Hashtags;
};
