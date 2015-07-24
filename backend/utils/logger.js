var logger = require('winston');



logger.add(logger.transports.File, {
  name: 'general-log',
  filename: 'logs/info.log'
});

logger.add(logger.transports.File, {
  name: 'error-log',
  filename: 'logs/error.log',
  level: 'error'
});

module.exports = logger;
