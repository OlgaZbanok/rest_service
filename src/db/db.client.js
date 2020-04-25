const mongoose = require('mongoose');
const { logger } = require('../helpers/logger');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const { createHash } = require('../helpers/hash');

const createAdminUser = async () => {
  const password = 'admin';
  const hashedPassword = await createHash(password);
  const admin = { name: 'admin', login: 'admin', password: hashedPassword };

  return await User.create(admin);
};

const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', () => logger.info('Connection error!'));
  db.once('open', async () => {
    logger.info('Сonnection successful');
    await db.dropDatabase();
    await createAdminUser();
    cb();
  });
};

module.exports = { connectDB };
