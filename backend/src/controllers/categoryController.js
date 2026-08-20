const categoryService = require("../services/categoryService");
const handleControllerError = require("../utils/controllerError");

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    res.status(200).json({
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    handleControllerError(res, error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
