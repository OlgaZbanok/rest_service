const router = require('express').Router({ mergeParams: true });
const { ErrorHandler } = require('../../helpers/error');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../../common/config').JWT_SECRET_KEY;
const { FORBIDDEN, OK, getStatusText } = require('http-status-codes');
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await loginService.isUserExist(login, password);

    if (!user) {
      throw new ErrorHandler(FORBIDDEN, getStatusText(FORBIDDEN));
    }

    const token = jwt.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET_KEY
    );

    res.status(OK).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
