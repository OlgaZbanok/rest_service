const router = require('express').Router();
const validateUUID = require('../../helpers/validateUUID');
const { ErrorHandler } = require('../../helpers/error');
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      return res.status(200).json(users.map(User.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.login || !req.body.password) {
        throw new ErrorHandler(400, 'Invalid data');
      }
      const user = await usersService.add(req.body);
      if (!user) {
        throw new ErrorHandler(400, 'Bad request');
      }
      return res.status(200).json(User.toResponse(user));
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
          404,
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
        throw new ErrorHandler(400, 'Invalid data');
      }
      const user = await usersService.update(req.params.id, req.body);
      if (!user) {
        throw new ErrorHandler(400, 'Bad request');
      }
      return res.status(200).json(User.toResponse(user));
    } catch (err) {
      return next(err);
    }
  })
  .delete(validateUUID, async (req, res, next) => {
    try {
      const user = await usersService.remove(req.params.id);
      if (!user) {
        throw new ErrorHandler(404, 'User not found');
      }
      return res.status(204).json({
        message: 'The user has been deleted'
      });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
