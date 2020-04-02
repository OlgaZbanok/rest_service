const User = require('./user.model');

const USERS = [
  new User({ name: 'first', login: 'first', password: 'sdf#938e' }),
  new User({ name: 'second', login: 'second', password: 'af3@234f' })
];

const getAll = async () => {
  return USERS;
};

module.exports = { getAll };
