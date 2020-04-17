const { PORT } = require('./common/config');
const app = require('./app');

process.on('uncaughtException', err => {
  console.error(`UncaughtException captured: ${err.message}`);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
