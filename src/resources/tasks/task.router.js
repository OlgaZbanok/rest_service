const router = require('express').Router({ mergeParams: true });
const validateUUID = require('../../helpers/validateUUID');
const { ErrorHandler } = require('../../helpers/error');
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await tasksService.getByBoardId(req.params.boardId);
      if (!tasks) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(200).json(tasks);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const task = await tasksService.add(req.params.boardId, req.body);
      if (!task) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(200).json(task);
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
          404,
          `Task with id = ${req.params.id} is not found`
        );
      }
      res.status(200).json(task);
    } catch (err) {
      return next(err);
    }
  })
  .put(validateUUID, async (req, res, next) => {
    try {
      const task = await tasksService.update(req.params, req.body);
      if (!task) {
        throw new ErrorHandler(400, 'Bad request');
      }
      res.status(200).json(task);
    } catch (err) {
      return next(err);
    }
  })
  .delete(validateUUID, async (req, res, next) => {
    try {
      const result = await tasksService.remove(req.params);
      if (!result) {
        throw new ErrorHandler(404, 'Task is not found');
      }
      res.status(204).json({ message: 'The task has been deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
