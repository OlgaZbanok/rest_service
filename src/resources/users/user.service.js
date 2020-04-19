const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');
const User = require('./user.model');

const getAll = async () => await usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const add = async data => {
  const { name, login, password } = data;
  const user = new User({ name, login, password });
  await usersRepo.add(user);
  return user;
};

const update = async (id, data) => {
  // eslint-disable-next-line no-unused-vars
  const { password, ...expectedUser } = data;
  const user = await usersRepo.update(id, expectedUser);
  return user;
};

const remove = async id => {
  const result = await usersRepo.remove(id);
  await tasksService.resetUser(id);
  return result;
};

module.exports = { getAll, getById, add, update, remove };
