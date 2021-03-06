const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logger } = require('./helpers/logger');
const { handleError, ErrorHandler } = require('./helpers/error');
const { NOT_FOUND, getStatusText } = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const checkToken = require('./helpers/authorization');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(
    `status: ${res.statusCode} method: ${req.method}  url: ${
      req.url
    } query: ${JSON.stringify(req.query)} body: ${JSON.stringify(req.body)}`
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

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/boards/:boardId/tasks', checkToken, taskRouter);

app.get('*', (req, res, next) => {
  const err = new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
  handleError(err, req, res);
  next();
});

app.use((err, req, res, next) => {
  handleError(err, req, res);
  next();
});

module.exports = app;
