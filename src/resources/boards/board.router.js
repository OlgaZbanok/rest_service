const router = require('express').Router();

const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  } catch (err) {
    res.json('Bad request');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.getById(req.params.id);
    res.status(200).json(board);
  } catch (err) {
    res.status(404).json({
      message: `Board with id = ${req.params.id} not found`
    });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.add(req.body);
    res.status(200).json(board);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).json(board);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(204).json({ message: 'The border has been deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Board not found' });
  }
});

module.exports = router;
