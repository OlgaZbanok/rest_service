const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getAll = async () => await boardsRepo.getAll();

const getById = async id => await boardsRepo.getById(id);

const add = async data => {
  const board = new Board({ ...data });
  await boardsRepo.add(board);
  return board;
};

const update = async (id, data) => {
  const board = await boardsRepo.update(id, data);
  return board;
};

const remove = async id => {
  const result = await boardsRepo.remove(id);
  await tasksService.removeByBoard(id);

  return result;
};

module.exports = { getAll, getById, add, update, remove };
