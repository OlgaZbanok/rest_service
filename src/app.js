const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logger } = require('./helpers/logger');
const { handleError, ErrorHandler } = require('./helpers/error');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(
    `${req.method}  ${req.url} query: ${JSON.stringify(
      req.query
    )} body: ${JSON.stringify(req.body)}`
  );
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.get('*', (req, res, next) => {
  const err = new ErrorHandler(404, 'Page not found');
  logger.error(
    `${err.statusCode} ${req.method}  ${req.originalUrl} message: ${err.message}`
  );
  handleError(err, res);
  next();
});

app.use((err, req, res, next) => {
  logger.error(
    `${err.statusCode} ${req.method}  ${req.originalUrl} message: ${err.message}`
  );
  handleError(err, res);
  next();
});

module.exports = app;
