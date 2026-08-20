const pool = require("../db/db");

const createCategory = async (category) => {
  const query = `
    SELECT * FROM create_category($1, $2, $3);
  `;

  const values = [
    category.name,
    category.description,
    category.status,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllCategories = async () => {
  const query = `
    SELECT * FROM get_all_categories();
  `;

  const result = await pool.query(query);

  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = `
    SELECT * FROM get_category_by_id($1);
  `;

  const result = await pool.query(query, [categoryId]);

  return result.rows[0];
};

const updateCategory = async (category, categoryId) => {
  const query = `
    SELECT * FROM update_category($1, $2, $3, $4);
  `;

  const values = [
    categoryId,
    category.name ?? null,
    category.description ?? null,
    category.status ?? null,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const deleteCategory = async (categoryId) => {
  const query = `
    SELECT * FROM delete_category($1);
  `;

  const result = await pool.query(query, [categoryId]);

  return result.rows[0];
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
