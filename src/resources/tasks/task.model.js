const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: uuid
    },
    boardId: {
      type: String,
      default: uuid
    },
    columnId: {
      type: String,
      default: uuid
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return { id: _id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
