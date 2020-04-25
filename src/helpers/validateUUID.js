const validate = require('uuid-validate');
const { ErrorHandler } = require('./error');
const { BAD_REQUEST } = require('http-status-codes');

const validateUUID = (req, res, next) => {
  if (!validate(req.params.id)) {
    throw new ErrorHandler(BAD_REQUEST, 'Id is not UUID');
  }
  next();
};

module.exports = validateUUID;
