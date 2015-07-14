"use strict";

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING
    },
    lastMsg: {
      type: DataTypes.TEXT
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    watchedTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Users;
};
