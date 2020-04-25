const bcrypt = require('bcrypt');

const saltRounds = 10;

const createHash = async password => await bcrypt.hash(password, saltRounds);

const comparePassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = { createHash, comparePassword };
