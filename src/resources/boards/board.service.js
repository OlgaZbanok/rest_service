const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const add = data => {
  const board = new Board({ ...data });
  boardsRepo.add(board);
  return board;
};

const update = (id, data) => {
  const board = boardsRepo.update(id, data);
  return board;
};

const remove = async id => {
  const result = await boardsRepo.remove(id);
  await tasksService.removeByBoard(id);

  return result;
};

module.exports = { getAll, getById, add, update, remove };
