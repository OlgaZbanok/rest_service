const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findById(id);
};

const add = async data => {
  return Board.create(data);
};

const update = async (id, data) => {
  return Board.updateOne({ _id: id }, data);
};

const remove = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getById, add, update, remove };
