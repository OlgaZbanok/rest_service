const Board = require('./board.model');

const BOARDS = [
  new Board({
    title: 'board1',
    columns: [
      {
        title: 'col1',
        order: 1
      },
      {
        title: 'col2',
        order: 2
      }
    ]
  })
];

const getAllBoards = async () => {
  return BOARDS;
};

module.exports = { getAllBoards };
