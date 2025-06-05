const userModel = require("../models/userModel");

const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await userModel.getUserById(id);
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

const registerUser = async (name, email, password) => {
  try {
    const userData = { name, email, password };
    const newUser = await userModel.registerUser(userData);
    return newUser;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await userModel.loginUser(email, password);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

const updateUser = async (id, name, email, password) => {
  try {
    const userData = { name, email, password };
    const updatedUser = await userModel.updateUser(id, userData);
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await userModel.deleteUser(id);
    return deletedUser;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
