var winston = require('winston');
var path = require('path');

var infofile = path.join(__dirname, '../logs/info.log');
var errfile = path.join(__dirname, '../logs/error.log');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      name: 'general-log',
      filename: infofile
    }),
    new (winston.transports.File)({
      name: 'error-log',
      filename: errfile,
      level: 'error'
    }),
  ]
});

module.exports = logger;
