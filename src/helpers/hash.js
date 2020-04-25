const bcrypt = require('bcrypt');

const saltRounds = 10;

const createHash = async password => await bcrypt.hash(password, saltRounds);

module.exports = createHash;
