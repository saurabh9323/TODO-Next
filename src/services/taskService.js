const Task = require("../models/Task");
const taskRepository = require("../repositories/taskRepository");

const createTask = async (taskData) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }

  const task = new Task({
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
  });

  const savedTask = await taskRepository.createTask(task);

  return savedTask;
};

module.exports = {
  createTask,
};