const { PORT } = require('./common/config');
const { connectDB } = require('./db/db.client');
const app = require('./app');
require('dotenv').config();

process.on('uncaughtException', err => {
  console.error(`UncaughtException captured: ${err.message}`);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

connectDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
