const Task = require('./task.model');

const getByBoardId = async boardId => {
  return Task.find({ boardId });
};

const getByTaskId = async (boardId, id) => {
  return Task.findOne({ boardId, _id: id });
};

const add = async task => {
  return Task.create(task);
};

const update = async (boardId, id, data) => {
  return Task.findOneAndUpdate({ boardId, _id: id }, data, { new: true });
};

const remove = async (boardId, id) => {
  return Task.findOneAndDelete({ boardId, _id: id });
};

const resetUser = async id => {
  return Task.updateMany({ userId: id }, { userId: null });
};

const removeByBoard = async id => {
  return Task.deleteMany({ boardId: id });
};

module.exports = {
  getByBoardId,
  getByTaskId,
  add,
  update,
  remove,
  resetUser,
  removeByBoard
};
