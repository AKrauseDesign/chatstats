"use strict";

module.exports = function(sequelize, DataTypes) {
  var Commands = sequelize.define("Commands", {
    command: {
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
  return Commands;
};
