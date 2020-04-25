const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');
const { ErrorHandler } = require('../../helpers/error');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const createHash = require('../../helpers/hash');
const User = require('./user.model');

const getAll = async () => await usersRepo.getAll();

const getById = async id => await usersRepo.getById(id);

const add = async data => {
  try {
    const { name, login, password } = data;
    const hashPassword = await createHash(password);
    const user = new User({ name, login, hashPassword });

    await usersRepo.add(user);
    return user;
  } catch (err) {
    throw new ErrorHandler(
      INTERNAL_SERVER_ERROR,
      getStatusText(INTERNAL_SERVER_ERROR)
    );
  }
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
