const tasksRepo = require('./task.db.repository');
const Task = require('./task.model');

const getByBoardId = async boardId => await tasksRepo.getByBoardId(boardId);

const getByTaskId = async params =>
  await tasksRepo.getByTaskId(params.boardId, params.id);

const add = async (boardId, data) => {
  const task = new Task({ ...data, boardId });
  await tasksRepo.add(task);
  return task;
};

const update = async (params, data) =>
  await tasksRepo.update(params.boardId, params.id, data);

const remove = async params =>
  await tasksRepo.remove(params.boardId, params.id);

const resetUser = async id => await tasksRepo.resetUser(id);

const removeByBoard = async id => await tasksRepo.removeByBoard(id);

module.exports = {
  getByBoardId,
  getByTaskId,
  add,
  update,
  remove,
  resetUser,
  removeByBoard
};
