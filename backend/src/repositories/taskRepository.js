const pool = require("../db/db");

const createTask = async (task) => {
  const query = `
    SELECT * FROM create_task($1, $2, $3, $4, $5, $6);
  `;

  const values = [
    task.title,
    task.description,
    task.priority,
    task.dueDate,
    task.userId,
    task.categoryId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllTasks = async () => {
  const query = `
    SELECT * FROM get_all_tasks();
  `;

  const result = await pool.query(query);

  return result.rows;
};

const getTaskById = async (taskId) => {
  const query = `
    SELECT * FROM get_task_by_id($1);
  `;

  const result = await pool.query(query, [taskId]);

  return result.rows[0];
};

const updateTask = async (task, taskId) => {
  const query = `
    SELECT * FROM update_task($1, $2, $3, $4, $5, $6, $7);
  `;

  const values = [
    taskId,
    task.title ?? null,
    task.description ?? null,
    task.priority ?? null,
    task.dueDate ?? null,
    task.status ?? null,
    task.categoryId ?? null,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const markTaskComplete = async (taskId, status) => {
  const query = `
    SELECT * FROM complete_task($1, $2);
  `;

  const result = await pool.query(query, [taskId, status]);

  return result.rows[0];
};

const deleteTask = async (taskId) => {
  const query = `
    SELECT * FROM delete_task($1);
  `;

  const result = await pool.query(query, [taskId]);

  return result.rows[0];
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  markTaskComplete,
  deleteTask,
};
