const Task = require("../models/Task");
const taskRepository = require("../repositories/taskRepository");
const AppError = require("../utils/appError");
const { validateUuid, validateWithSchema, z } = require("../utils/validation");

const taskStatuses = ["TODO", "IN_PROGRESS", "COMPLETED", "DELETED"];
const taskPriorities = ["LOW", "MEDIUM", "HIGH"];

const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().optional().default(""),
  priority: z.enum(taskPriorities, { message: "Invalid priority" }).optional().default("MEDIUM"),
  dueDate: z.string().optional().nullable(),
  userId: z.string().uuid("Invalid user ID"),
  categoryId: z.string().uuid("Invalid category ID").optional().nullable(),
});

const updateTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  description: z.string().optional(),
  priority: z.enum(taskPriorities, { message: "Invalid priority" }).optional(),
  dueDate: z.string().optional().nullable(),
  status: z.enum(taskStatuses, { message: "Invalid status" }).optional(),
  categoryId: z.string().uuid("Invalid category ID").optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

const normalizeTask = (taskData) => ({
  id: taskData.id,
  title: taskData.title,
  description: taskData.description,
  status: taskData.status,
  priority: taskData.priority,
  dueDate: taskData.dueDate || taskData.due_date,
  userId: taskData.userId || taskData.user_id,
  categoryId: taskData.categoryId || taskData.category_id,
  createdAt: taskData.createdAt || taskData.created_at,
  updatedAt: taskData.updatedAt || taskData.updated_at,
});

const handleTaskRepositoryError = (error) => {
  if (error.code === "23503") {
    throw new AppError("Related user or category not found", 404);
  }

  if (error.message && error.message.toLowerCase().includes("already deleted")) {
    throw new AppError("Task is already deleted", 409);
  }

  throw new AppError("Task operation failed", 500);
};

const createTask = async (taskData) => {
  const validTaskData = validateWithSchema(createTaskSchema, taskData);

  const task = new Task({
    title: validTaskData.title,
    description: validTaskData.description,
    priority: validTaskData.priority,
    dueDate: validTaskData.dueDate,
    userId: validTaskData.userId,
    categoryId: validTaskData.categoryId,
  });

  try {
    const savedTask = await taskRepository.createTask(task);

    return savedTask;
  } catch (error) {
    handleTaskRepositoryError(error);
  }
};

const getAllTasks = async () => {
  try {
    const tasks = await taskRepository.getAllTasks();

    return tasks;
  } catch (error) {
    handleTaskRepositoryError(error);
  }
};

const getTaskById = async (taskId) => {
  const validTaskId = validateUuid(taskId, "task ID");

  try {
    const task = await taskRepository.getTaskById(validTaskId);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return task;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handleTaskRepositoryError(error);
  }
};

const updateTask = async (taskId, taskData) => {
  const validTaskId = validateUuid(taskId, "task ID");
  const validTaskData = validateWithSchema(updateTaskSchema, taskData);

  try {
    const existingTask = await taskRepository.getTaskById(validTaskId);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    if (existingTask.status === "DELETED") {
      throw new AppError("Task is already deleted", 409);
    }

    const task = new Task(normalizeTask(existingTask));
    task.updateDetails(validTaskData);

    const updatedTask = await taskRepository.updateTask(task, validTaskId);

    return updatedTask;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handleTaskRepositoryError(error);
  }
};

const markTaskComplete = async (taskId) => {
  const validTaskId = validateUuid(taskId, "task ID");

  try {
    const existingTask = await taskRepository.getTaskById(validTaskId);

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    if (existingTask.status === "DELETED") {
      throw new AppError("Task is already deleted", 409);
    }

    const task = new Task(normalizeTask(existingTask));
    task.markComplete();

    const completedTask = await taskRepository.markTaskComplete(validTaskId, task.status);

    return completedTask;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.message === "Task is already completed") {
      throw new AppError("Task is already completed", 409);
    }
    handleTaskRepositoryError(error);
  }
};

const deleteTask = async (taskId) => {
  const validTaskId = validateUuid(taskId, "task ID");

  try {
    const deletedTask = await taskRepository.deleteTask(validTaskId);

    if (!deletedTask) {
      throw new AppError("Task not found", 404);
    }

    return deletedTask;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handleTaskRepositoryError(error);
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
