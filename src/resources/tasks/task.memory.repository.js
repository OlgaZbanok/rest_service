const Task = require('./task.model');

let TASKS = [new Task()];

const getByBoardId = async boardId => {
  const tasksByBoardId = TASKS.filter(task => task.boardId === boardId);
  if (!tasksByBoardId.length) {
    throw new Error();
  }
  return tasksByBoardId;
};

const getByTaskId = async (boardId, taskId) => {
  const tasksByBoardId = await getByBoardId(boardId);
  const tasksById = tasksByBoardId.find(task => task.id === taskId);
  if (!tasksById) {
    throw new Error();
  }
  return tasksById;
};

const add = async (boardId, task) => TASKS.push({ ...task });

const update = async (boardId, taskId, data) => {
  const updateTask = await getByTaskId(boardId, taskId);
  Object.assign(updateTask, data);
  return updateTask;
};

const remove = async (boardId, taskId) => {
  const tasksByBoardId = await getByBoardId(boardId);
  TASKS = tasksByBoardId.filter(task => task.id !== taskId);
  return;
};

module.exports = { getByBoardId, getByTaskId, add, update, remove };
