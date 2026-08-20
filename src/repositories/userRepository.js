const pool = require("../db/db");

const createUser = async (user) => {
  const query = `
    SELECT * FROM create_user($1, $2, $3, $4, $5, $6);
  `;

  const values = [
    user.name,
    user.userName,
    user.email,
    user.passwordHash,
    user.status,
    user.role,
  ];

  console.log("Repository values:", values);

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllUsers = async () => {
  const query = `
    SELECT * FROM get_all_users();
  `;

  const result = await pool.query(query);

  return result.rows;
};

const getAllUsersById = async (userId) => {
  const query = `
    SELECT * FROM get_users_id($1);
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};



module.exports = {
  createUser,
  getAllUsers,
  getAllUsersById,
};