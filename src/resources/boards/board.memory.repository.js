const Board = require('./board.model');

let BOARDS = [new Board()];

const getAll = async () => BOARDS;

const getById = async id => {
  const findBoard = BOARDS.find(board => board.id === id);
  if (!findBoard) {
    throw new Error();
  }
  return findBoard;
};
const add = async data => BOARDS.push(data);

const update = async (id, data) => {
  const findBoard = BOARDS.find(board => board.id === id);
  if (!findBoard) {
    throw new Error();
  }
  Object.assign(findBoard, data);
  return findBoard;
};

const remove = async id => {
  const findBoard = BOARDS.find(board => board.id === id);
  if (!findBoard) {
    throw new Error();
  }

  BOARDS = BOARDS.filter(board => board.id !== id);
  return;
};

module.exports = { getAll, getById, add, update, remove };
