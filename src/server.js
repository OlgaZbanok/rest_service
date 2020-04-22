const { PORT } = require('./common/config');
const { connectDB } = require('./db/db.client');
const { logger } = require('./helpers/logger');
const app = require('./app');

process.on('uncaughtException', err => {
  console.error(`UncaughtException captured: ${err.message}`);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

connectDB(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
