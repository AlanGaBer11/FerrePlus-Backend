const userService = require("../services/userService");

const getAllUsers = async () => {
  try {
    const users = await userService.getAllUsers();
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

const registerUser = async (name, email, password) => {
  try {
    const userData = { name, email, password };
    const newUser = await userService.registerUser(userData);
    return newUser;
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    throw err;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await userService.loginUser(email, password);
    return user;
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    throw err;
  }
};

const createUser = async (name, email, password, role) => {
  try {
    const userData = { name, email, password, role };
    const newUser = await userService.createUser(userData);
    return newUser;
  } catch (err) {
    console.error("Error al crear el usuario", err);
    throw err;
  }
};

const updateUser = async (id, name, email, password, role) => {
  try {
    const userData = { name, email, password, role };
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
