const taskService = require("../services/taskService");
const handleControllerError = require("../utils/controllerError");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      message: "Task created",
      data: task,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.status(200).json({
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);

    res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const markTaskComplete = async (req, res) => {
  try {
    const task = await taskService.markTaskComplete(req.params.id);

    res.status(200).json({
      message: "Task marked complete successfully",
      data: task,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  markTaskComplete,
  deleteTask,
};
