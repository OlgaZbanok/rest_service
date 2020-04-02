const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id =>
  getAll().then(users => users.find(user => user.id === id));

module.exports = { getAll, getUser };
