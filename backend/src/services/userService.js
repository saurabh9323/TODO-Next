const User = require("../models/User");
const userRepository = require("../repositories/userRepository");

const createUserService = async (userData) => {
  console.log("Creating user with data:", userData); // Log the user data for debugging
  if (!userData.name || !userData.email || !userData.password) {

    throw new Error(`Name, email, and password are required ${userData}`);
  }

  const user = new User({
    name: userData.name,
    email: userData.email,
    userName: userData.username,
    role: userData.role || "USER",
    passwordHash: userData.password,
  });
  console.log("User object created:", user); // Log the created user object for debugging

  const savedUser = await userRepository.createUser(user);

  return savedUser;
};

const updateUserService = async (userData) => {
  if (!userData.id) {
    throw new Error("User ID is required");
  }
  const user = new User(userData);
  const updatedUser = await userRepository.updateUser(user, userData.id);
  return updatedUser;
};

const deleteUserService = async (userData) => {
  if (!userData.id) {
    throw new Error("User ID is required");
  }
  const deletedUser = await userRepository.deleteUser(userData.id);
  return deletedUser;
}

const getAllUsersService = async () => {
  const users = await userRepository.getAllUsers();
  return users;
}
const getAllUsersByIdService = async (userData) => {
  if (!userData.id) {
    throw new Error("User ID is required");
  }
  const user = await userRepository.getAllUsersById(userData.id);
  return user;
}

module.exports = {
  updateUserService,
  createUserService,
  deleteUserService,
  getAllUsersService,
  getAllUsersByIdService
};