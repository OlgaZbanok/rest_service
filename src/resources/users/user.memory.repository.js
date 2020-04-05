const User = require('./user.model');

let USERS = [new User()];

const getAll = async () => USERS;

const getById = async id => {
  const findUser = USERS.find(user => user.id === id);
  if (!findUser) {
    throw new Error();
  }
  return findUser;
};

const add = async user => USERS.push(user);

const update = async (id, data) => {
  const findUser = USERS.find(user => user.id === id);
  if (!findUser) {
    throw new Error();
  }
  Object.assign(findUser, data);
  return findUser;
};

const remove = async id => {
  const findUser = USERS.find(user => user.id === id);
  if (!findUser) {
    throw new Error();
  }
  USERS = USERS.filter(user => user.id !== id);
  return;
};

module.exports = { getAll, getById, add, update, remove };
