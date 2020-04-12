const router = require('express').Router();
const validateUUID = require('../../helpers/validateUUID');
const { ErrorHandler } = require('../../helpers/error');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAll();
      res.status(200).json(boards);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const board = await boardsService.add(req.body);
      if (!board) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(200).json(board);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(validateUUID, async (req, res, next) => {
    try {
      const board = await boardsService.getById(req.params.id);
      if (!board) {
        throw new ErrorHandler(
          404,
          `Board with id = ${req.params.id} is not found`
        );
      }
      res.status(200).json(board);
    } catch (err) {
      return next(err);
    }
  })
  .put(validateUUID, async (req, res, next) => {
    try {
      const board = await boardsService.update(req.params.id, req.body);
      if (!board) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(200).json(board);
    } catch (err) {
      return next(err);
    }
  })
  .delete(validateUUID, async (req, res, next) => {
    try {
      const result = await boardsService.remove(req.params.id);
      if (!result) {
        throw new ErrorHandler(404, 'Board is not found');
      }
      res.status(204).json({ message: 'The border has been deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
