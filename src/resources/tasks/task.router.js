const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const validateUUID = require('../../helpers/validateUUID');
const { ErrorHandler } = require('../../helpers/error');
const tasksService = require('./task.service');
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
      const tasks = await tasksService.getByBoardId(req.params.boardId);

      if (!tasks) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      res.status(OK).json(tasks.map(Task.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const task = await tasksService.add(req.params.boardId, req.body);

      if (!task) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      res.status(OK).json(Task.toResponse(task));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(validateUUID, async (req, res, next) => {
    try {
      const task = await tasksService.getByTaskId(req.params);

      if (!task) {
        throw new ErrorHandler(
          NOT_FOUND,
          `Task with id = ${req.params.id} is not found`
        );
      }

      res.status(OK).json(Task.toResponse(task));
    } catch (err) {
      return next(err);
    }
  })
  .put(validateUUID, async (req, res, next) => {
    try {
      const task = await tasksService.update(req.params, req.body);

      if (!task) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }

      res.status(OK).json(Task.toResponse(task));
    } catch (err) {
      return next(err);
    }
  })
  .delete(validateUUID, async (req, res, next) => {
    try {
      const result = await tasksService.remove(req.params);

      if (!result) {
        throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
      }

      res.status(NO_CONTENT).json({ message: 'The task has been deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
