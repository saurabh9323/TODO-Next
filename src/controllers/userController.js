const userService = require("../services/userService");

const createUserController = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body for debugging
    const user = await userService.createUserService(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userService.updateUserService(req.body);
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = await userService.deleteUserService(req.body);
    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsersByIdController = async (req, res) => {
  try {
    const users = await userService.getAllUsersByIdService(req.body);
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
  getAllUsersByIdController,
};