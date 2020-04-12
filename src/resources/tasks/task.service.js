const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getByBoardId = boardId => tasksRepo.getByBoardId(boardId);

const getByTaskId = params => tasksRepo.getByTaskId(params.boardId, params.id);

const add = (boardId, data) => {
  const task = new Task({ ...data, boardId });
  tasksRepo.add(task);
  return task;
};

const update = (params, data) =>
  tasksRepo.update(params.boardId, params.id, data);

const remove = params => tasksRepo.remove(params.boardId, params.id);

const resetUser = id => tasksRepo.resetUser(id);

const removeByBoard = id => tasksRepo.removeByBoard(id);

module.exports = {
  getByBoardId,
  getByTaskId,
  add,
  update,
  remove,
  resetUser,
  removeByBoard
};
