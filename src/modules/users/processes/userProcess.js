const userService = require("../services/userService");

const getAllUsers = async (page, limit) => {
  try {
    const users = await userService.getAllUsers(page, limit);
    return users;
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const user = await userService.getUserById(id);
    return user;
  } catch (err) {
    console.error("Error al obtener el usuario:", err);
    throw err;
  }
};

const createUser = async (userData) => {
  try {
    const newUser = await userService.createUser(userData);
    return newUser;
  } catch (err) {
    console.error("Error al crear el usuario", err);
    throw err;
  }
};

const updateUser = async (id, userData) => {
  try {
    const updatedUser = await userService.updateUser(id, userData);
    return updatedUser;
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await userService.deleteUser(id);
    return user;
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    throw err;
  }
};

const deactivateUser = async (id) => {
  try {
    const user = await userService.deactivateUser(id);
    return user;
  } catch (err) {
    console.error("Error al desactivar usuario:", err);
    throw err;
  }
};

const reactivateUser = async (id) => {
  try {
    const user = await userService.reactivateUser(id);
    return user;
  } catch (err) {
    console.error("Error al reactivar usuario:", err);
    throw err;
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
