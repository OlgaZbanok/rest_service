const { logger } = require('./logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode ? statusCode : INTERNAL_SERVER_ERROR).json({
    status: 'error',
    statusCode: statusCode ? statusCode : INTERNAL_SERVER_ERROR,
    message: message ? message : getStatusText(INTERNAL_SERVER_ERROR)
  });
};

process.on('uncaughtException', (err, origin) => {
  logger.error(`statusCode: ${INTERNAL_SERVER_ERROR} ${origin} ${err.message}`);
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `statusCode: ${INTERNAL_SERVER_ERROR} Unhandled Rejection at: ${promise} reason: ${reason}`
  );
});

module.exports = { ErrorHandler, handleError };
