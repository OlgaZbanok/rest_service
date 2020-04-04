const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAllUsers();

const getUser = id =>
  getAll().then(users => {
    const detectUser = users.find(user => user.id === id);
    if (!detectUser) {
      throw new Error();
    }
    return detectUser;
  });

const addUser = newUser =>
  getAll().then(users => {
    const { name, login, password } = newUser;
    users.push(new User({ name, login, password }));
    return users[users.length - 1];
  });

const updateUser = (id, updUser) =>
  getAll().then(users => {
    const index = users.findIndex(user => user.id === id);
    // eslint-disable-next-line no-unused-vars
    const { password, ...expectedUser } = updUser;
    Object.assign(users[index], expectedUser);

    return users[index];
  });

const deleteUser = id =>
  getAll().then(users => {
    const index = users.findIndex(user => user.id === id);
    if (index < 0) {
      throw new Error();
    }
    users.splice(index, 1);
    return users;
  });

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
