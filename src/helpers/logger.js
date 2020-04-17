const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(format.colorize(), format.cli()),
      handleExceptions: true
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'logs/all.log',
      level: 'info',
      handleExceptions: true,
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/exceptions.log',
      handleExceptions: true,
      json: true,
      format: format.combine(format.prettyPrint())
    })
  ],
  exitOnError: true
});

module.exports = { logger };
