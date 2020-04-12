const User = require('./user.model');

let USERS = [new User()];

const getAll = async () => await USERS;

const getById = async id => await USERS.find(user => user.id === id);

const add = async user => await USERS.push(user);

const update = async (id, data) => {
  const findUser = await USERS.find(user => user.id === id);
  if (!findUser) {
    return false;
  }
  await Object.assign(findUser, data);
  return findUser;
};

const remove = async id => {
  const findUser = USERS.find(user => user.id === id);
  if (!findUser) {
    return false;
  }
  USERS = USERS.filter(user => user.id !== id);
  return true;
};

module.exports = { getAll, getById, add, update, remove };
