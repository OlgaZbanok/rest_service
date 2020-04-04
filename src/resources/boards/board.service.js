const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAllBoards();

const getBoard = id =>
  getAll().then(boards => {
    const detectBoard = boards.find(board => board.id === id);
    if (!detectBoard) {
      throw new Error();
    }
    return detectBoard;
  });

const addBoard = newBoard =>
  getAll().then(boards => {
    boards.push(new Board({ ...newBoard }));
    return boards[boards.length - 1];
  });

const updateBoard = (id, updBoard) =>
  getAll().then(boards => {
    const index = boards.findIndex(board => board.id === id);

    if (updBoard.columns.length !== boards[index].columns.length) {
      throw new Error();
    }
    Object.assign(boards[index], updBoard);

    return boards[index];
  });

const deleteBoard = id =>
  getAll().then(boards => {
    const index = boards.findIndex(board => board.id === id);
    if (index < 0) {
      throw new Error();
    }
    boards.splice(index, 1);
    return boards;
  });

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
