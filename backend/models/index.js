'use strict';

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config    = require('../config');
var db        = {};
var sequelize = new Sequelize(config.database.database, config.database.user, config.database.pass, {
  host: config.database.host,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
