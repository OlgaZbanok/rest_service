const mongoose = require('mongoose');
const { logger } = require('../helpers/logger');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', () => logger.info('Connection error!'));

  db.once('open', () => {
    logger.info('Сonnection successful');
    db.dropDatabase();
    cb();
  });
};

module.exports = { connectDB };
