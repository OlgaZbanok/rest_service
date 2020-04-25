const router = require('express').Router();
const Board = require('./board.model');
const validateUUID = require('../../helpers/validateUUID');
const { ErrorHandler } = require('../../helpers/error');
const boardsService = require('./board.service');
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
      const boards = await boardsService.getAll();
      res.status(OK).json(boards.map(Board.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const board = await boardsService.add(req.body);

      if (!board) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      res.status(OK).json(Board.toResponse(board));
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
          NOT_FOUND,
          `Board with id = ${req.params.id} is not found`
        );
      }

      res.status(OK).json(Board.toResponse(board));
    } catch (err) {
      return next(err);
    }
  })
  .put(validateUUID, async (req, res, next) => {
    try {
      const board = await boardsService.update(req.params.id, req.body);

      if (!board) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      res.status(OK).json(Board.toResponse(board));
    } catch (err) {
      return next(err);
    }
  })
  .delete(validateUUID, async (req, res, next) => {
    try {
      const result = await boardsService.remove(req.params.id);

      if (!result) {
        throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
      }

      res.status(NO_CONTENT).json({ message: 'The border has been deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
