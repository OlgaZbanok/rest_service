const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getByBoardId(req.params.boardId);

    res.status(200).json(tasks);
  } catch (err) {
    res.json('Bad request');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.getByTaskId(req.params);
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({
      message: `Task with id = ${req.params.id} not found`
    });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const task = await tasksService.add(req.params.boardId, req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params, req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params);
    res.status(204).json({ message: 'The task has been deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
