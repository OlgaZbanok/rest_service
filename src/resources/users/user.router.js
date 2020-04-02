const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getUser(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    console.log(err);
    res.status(404);
    res.end('User not found');
  }
});

module.exports = router;
