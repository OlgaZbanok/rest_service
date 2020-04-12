const Task = require('./task.model');

let TASKS = [new Task()];

const getByBoardId = async boardId => {
  const tasksByBoardId = await TASKS.filter(task => task.boardId === boardId);
  if (!tasksByBoardId.length) {
    return false;
  }
  return tasksByBoardId;
};

const getByTaskId = async (boardId, taskId) => {
  const tasksByBoardId = await getByBoardId(boardId);
  if (!tasksByBoardId) {
    return false;
  }
  const tasksById = await tasksByBoardId.find(task => task.id === taskId);
  if (!tasksById) {
    return false;
  }
  return tasksById;
};

const add = async task => await TASKS.push({ ...task });

const update = async (boardId, taskId, data) => {
  const updateTask = await getByTaskId(boardId, taskId);
  if (!updateTask) {
    return false;
  }
  await Object.assign(updateTask, data);
  return updateTask;
};

const remove = async (boardId, taskId) => {
  const tasksByBoardId = await getByBoardId(boardId);
  if (!tasksByBoardId) {
    return false;
  }
  TASKS = await tasksByBoardId.filter(task => task.id !== taskId);
  return true;
};

const resetUser = async id => {
  TASKS = TASKS.map(task => {
    if (task.userId === id) {
      task.userId = null;
    }
    return task;
  });
};

const removeByBoard = async id => {
  TASKS = TASKS.filter(task => task.boardId !== id);
  return true;
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
