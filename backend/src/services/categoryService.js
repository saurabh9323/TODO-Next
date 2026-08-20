const Category = require("../models/Category");
const categoryRepository = require("../repositories/categoryRepository");
const AppError = require("../utils/appError");
const { validateUuid, validateWithSchema, z } = require("../utils/validation");

const categoryStatuses = ["ACTIVE", "INACTIVE", "DELETED"];

const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  description: z.string().optional().default(""),
  status: z.enum(categoryStatuses, { message: "Invalid status" }).optional().default("ACTIVE"),
});

const updateCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").optional(),
  description: z.string().optional(),
  status: z.enum(categoryStatuses, { message: "Invalid status" }).optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required",
});

const normalizeCategory = (categoryData) => ({
  id: categoryData.id,
  name: categoryData.name,
  description: categoryData.description,
  status: categoryData.status,
  createdAt: categoryData.createdAt || categoryData.created_at,
  updatedAt: categoryData.updatedAt || categoryData.updated_at,
});

const handleCategoryRepositoryError = (error) => {
  if (error.code === "23505") {
    throw new AppError("Category name already exists", 409);
  }

  if (error.message && error.message.toLowerCase().includes("already deleted")) {
    throw new AppError("Category is already deleted", 409);
  }

  throw new AppError("Category operation failed", 500);
};

const createCategory = async (categoryData) => {
  const validCategoryData = validateWithSchema(createCategorySchema, categoryData);

  const category = new Category(validCategoryData);

  try {
    const savedCategory = await categoryRepository.createCategory(category);

    return savedCategory;
  } catch (error) {
    handleCategoryRepositoryError(error);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await categoryRepository.getAllCategories();

    return categories;
  } catch (error) {
    handleCategoryRepositoryError(error);
  }
};

const getCategoryById = async (categoryId) => {
  const validCategoryId = validateUuid(categoryId, "category ID");

  try {
    const category = await categoryRepository.getCategoryById(validCategoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return category;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handleCategoryRepositoryError(error);
  }
};

const updateCategory = async (categoryId, categoryData) => {
  const validCategoryId = validateUuid(categoryId, "category ID");
  const validCategoryData = validateWithSchema(updateCategorySchema, categoryData);

  try {
    const existingCategory = await categoryRepository.getCategoryById(validCategoryId);

    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }

    if (existingCategory.status === "DELETED") {
      throw new AppError("Category is already deleted", 409);
    }

    const category = new Category(normalizeCategory(existingCategory));
    category.updateDetails(validCategoryData);

    const updatedCategory = await categoryRepository.updateCategory(category, validCategoryId);

    return updatedCategory;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handleCategoryRepositoryError(error);
  }
};

const deleteCategory = async (categoryId) => {
  const validCategoryId = validateUuid(categoryId, "category ID");

  try {
    const deletedCategory = await categoryRepository.deleteCategory(validCategoryId);

    if (!deletedCategory) {
      throw new AppError("Category not found", 404);
    }

    return deletedCategory;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handleCategoryRepositoryError(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
