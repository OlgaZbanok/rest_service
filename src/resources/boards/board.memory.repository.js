const Board = require('./board.model');

let BOARDS = [new Board()];

const getAll = async () => await BOARDS;

const getById = async id => {
  const findBoard = await BOARDS.find(board => board.id === id);
  if (!findBoard) {
    return false;
  }
  return findBoard;
};

const add = async data => await BOARDS.push(data);

const update = async (id, data) => {
  const findBoard = await BOARDS.find(board => board.id === id);
  if (!findBoard) {
    return false;
  }
  await Object.assign(findBoard, data);
  return findBoard;
};

const remove = async id => {
  const findBoard = BOARDS.find(board => board.id === id);
  if (!findBoard) {
    return false;
  }

  BOARDS = BOARDS.filter(board => board.id !== id);
  return true;
};

module.exports = { getAll, getById, add, update, remove };
