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

const registerUser = async (userData) => {
  try {
    // const userData = { name, email, password };
    const newUser = await userService.registerUser(userData);
    return newUser;
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    throw err;
  }
};

const loginUser = async (credentials) => {
  try {
    const user = await userService.loginUser(credentials);
    return user;
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    throw err;
  }
};

const createUser = async (userData) => {
  try {
    // const userData = { name, email, password, role };
    const newUser = await userService.createUser(userData);
    return newUser;
  } catch (err) {
    console.error("Error al crear el usuario", err);
    throw err;
  }
};

const updateUser = async (id, userData) => {
  try {
    // const userData = { name, email, password, role };
    const updatedUser = await userService.updateUser(id, userData);
    return updatedUser;
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await userService.deleteUser(id);
    return deletedUser;
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser,
};
