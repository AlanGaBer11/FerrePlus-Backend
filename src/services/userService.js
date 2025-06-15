const userModel = require('../models/userModel')

const getAllUsers = async () => {
  try {
    const users = await userModel.getAllUsers()
    return users
  } catch (err) {
    console.error('Error al obtener usuarios:', err)
    throw err
  }
}

const getUserById = async (id) => {
  try {
    const user = await userModel.getUserById(id)
    return user
  } catch (err) {
    console.error('Error al obtener el usuario:', err)
    throw err
  }
}

const registerUser = async (name, email, password) => {
  try {
    const userData = { name, email, password }
    const newUser = await userModel.registerUser(userData)
    return newUser
  } catch (err) {
    console.error('Error al registrar usuario:', err)
    throw err
  }
}

const loginUser = async (email, password) => {
  try {
    const user = await userModel.loginUser(email, password)
    return user
  } catch (err) {
    console.error('Error al iniciar sesión:', err)
    throw err
  }
}

const updateUser = async (id, name, email, password) => {
  try {
    const userData = { name, email, password }
    const updatedUser = await userModel.updateUser(id, userData)
    return updatedUser
  } catch (err) {
    console.error('Error al actualizar usuario:', err)
    throw err
  }
}

const deleteUser = async (id) => {
  try {
    const deletedUser = await userModel.deleteUser(id)
    return deletedUser
  } catch (err) {
    console.error('Error al eliminar usuario:', err)
    throw err
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}
