const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const add = data => {
  const { name, login, password } = data;
  const user = new User({ name, login, password });
  usersRepo.add(user);
  return user;
};

const update = (id, data) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...expectedUser } = data;
  const user = usersRepo.update(id, expectedUser);

  return user;
};

const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, add, update, remove };
