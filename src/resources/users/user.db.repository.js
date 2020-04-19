const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findById(id);
};

const add = async user => {
  return User.create(user);
};

const update = async (id, data) => {
  return User.findByIdAndUpdate({ _id: id }, data, { new: true });
};

const remove = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getById, add, update, remove };
