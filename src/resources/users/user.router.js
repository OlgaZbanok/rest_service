const router = require('express').Router();
const validateUUID = require('../../helpers/validateUUID');
const { ErrorHandler } = require('../../helpers/error');
const User = require('./user.model');
const usersService = require('./user.service');
const {
  BAD_REQUEST,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      return res.status(OK).json(users.map(User.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.login || !req.body.password) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      const user = await usersService.add(req.body);

      if (!user) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      return res.status(OK).json(User.toResponse(user));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(validateUUID, async (req, res, next) => {
    try {
      const user = await usersService.getById(req.params.id);

      if (!user) {
        throw new ErrorHandler(
          NOT_FOUND,
          `User with id = ${req.params.id} not found`
        );
      }

      return res.json(User.toResponse(user));
    } catch (err) {
      return next(err);
    }
  })
  .put(validateUUID, async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.login || !req.body.password) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      const user = await usersService.update(req.params.id, req.body);

      if (!user) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      return res.status(OK).json(User.toResponse(user));
    } catch (err) {
      return next(err);
    }
  })
  .delete(validateUUID, async (req, res, next) => {
    try {
      const user = await usersService.remove(req.params.id);

      if (!user) {
        throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
      }

      return res.status(NO_CONTENT).json({
        message: 'The user has been deleted'
      });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
