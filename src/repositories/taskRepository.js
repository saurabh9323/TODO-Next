const pool = require("../db/db");

const createTask = async (task) => {
  const query = `
    SELECT * FROM create_task($1, $2, $3, $4, $5, $6);
  `;

  const values = [
    task.title,
    task.description,
    task.priority,
    task.status,
    task.userId,
    task.categoryId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  createTask,
};