const userService = require("../services/userService");

const getAllUsers = async (page, limit) => {
  try {
    const users = await userService.getAllUsers(page, limit);
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await userService.getUserById(id);
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const newUser = await userService.createUser(userData);
    return newUser;
  } catch (error) {
    console.error("Error al crear el usuario", error);
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const updatedUser = await userService.updateUser(id, userData);
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await userService.deleteUser(id);
    return user;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

const deactivateUser = async (id) => {
  try {
    const user = await userService.deactivateUser(id);
    return user;
  } catch (error) {
    console.error("Error al desactivar usuario:", error);
    throw error;
  }
};

const reactivateUser = async (id) => {
  try {
    const user = await userService.reactivateUser(id);
    return user;
  } catch (error) {
    console.error("Error al reactivar usuario:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deactivateUser,
  reactivateUser,
};
