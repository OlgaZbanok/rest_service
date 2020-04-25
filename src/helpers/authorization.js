const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../common/config').JWT_SECRET_KEY;
const { ErrorHandler } = require('./error');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');

const checkToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith('Bearer ')) {
    const token = header.slice(7);

    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        throw new ErrorHandler(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
      }
      return next();
    });
  } else {
    throw new ErrorHandler(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
  }
};

module.exports = checkToken;
