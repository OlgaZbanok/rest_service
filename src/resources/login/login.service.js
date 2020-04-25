const userService = require('../users/user.service');

const isUserExist = async (login, password) =>
  await userService.isExist(login, password);

module.exports = {
  isUserExist
};
