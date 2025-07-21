const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      order: [["id_user", "ASC"]],
    });
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// FUNCIÓN PARA OBTENER UN USUARIO POR ID
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA REGISTRAR UN USUARIO
const registerUser = async (userData) => {
  const { name, email, password } = userData;
  try {
    // VERIFICAR SI EL EMAIL YA EXISTE
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREAR USUARIO
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA HACER LOGIN
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("El Usuario No Existe");
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña Incorrecta");
    }

    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// FUNCIÓN PARA CREAR UN USUARIO
const createUser = async (userData) => {
  const { name, email, password, role } = userData;
  try {
    // VERIFICAR SI EL EMAIL YA EXISTE
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // HASHEAMOS LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREAR USUARIO
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN USUARIO
const updateUser = async (id, userData) => {
  const { name, email, password, role } = userData;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Hashear la nueva contraseña si se proporciona
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Actualizar usuario
    await User.update({
      name,
      email,
      password: hashedPassword || user.password,
      role,
    });

    return user;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA ELIMINAR UN USUARIO
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }

    await User.destroy();
    return user;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
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
