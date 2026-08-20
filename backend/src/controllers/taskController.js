const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json({
      message: "Task created",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
};