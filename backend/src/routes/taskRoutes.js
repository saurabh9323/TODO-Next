const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  markTaskComplete,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/complete", markTaskComplete);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
