const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    res.json('Bad request');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).json({
      message: `User with id = ${req.params.id} not found`
    });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.add(req.body);
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).json(User.toResponse(user));
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).json({ message: 'The user has been deleted' });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
