const { logger } = require('./logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res) => {
  let { statusCode, message } = err;

  statusCode = statusCode ? statusCode : INTERNAL_SERVER_ERROR;
  message = message ? message : getStatusText(INTERNAL_SERVER_ERROR);

  logger.error(
    `status: ${statusCode} method: ${req.method} url: ${req.url} message: ${err.message}`
  );

  res.status(statusCode).send({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = { ErrorHandler, handleError };
