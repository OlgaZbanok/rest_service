const validate = require('uuid-validate');
const { ErrorHandler } = require('./error');

const validateUUID = (req, res, next) => {
  if (!validate(req.params.id)) {
    throw new ErrorHandler(400, 'Id is not UUID');
  }
  next();
};

module.exports = validateUUID;
