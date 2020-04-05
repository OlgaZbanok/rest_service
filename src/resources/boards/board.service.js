const boardsRepo = require('./board.memory.repository');

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

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, getById, add, update, remove };
