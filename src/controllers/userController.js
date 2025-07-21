const userProcess = require("../processes/userProcess");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await userProcess.getAllUsers();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hay usuarios" });
    }
    res
      .status(200)
      .json({ success: true, message: "Usuarios obtenidos", users });
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userProcess.getUserById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario obtenido", user });
  } catch (error) {
    console.error("Error al obtener el usuario", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newUser = await userProcess.registerUser(name, email, password);
    res
      .status(201)
      .json({ success: true, message: "Usuario registrado", user: newUser });
  } catch (error) {
    console.error("Error al registrar el usuario", error);

    // Si es un error de email duplicado
    if (error.message === "El email ya está registrado") {
      return res.status(409).json({ success: false, message: error.message });
    }

    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email y Password son obligatorios" });
    }
    const user = await userProcess.loginUser(email, password);
    // Generar token
    const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user,
    });
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    // Si el error es de autenticación, enviamos 401
    if (
      error.message === "El usuario no existe" ||
      error.message === "Contraseña incorrecta"
    ) {
      return res.status(401).json({ success: false, message: error.message });
    }

    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newUser = await userProcess.createUser(name, email, password, role);
    res.status(201).json({ success: true, message: "Usuario creado", newUser });
  } catch (error) {
    console.error("Error al registrar el usuario", error);

    // Si es un error de email duplicado
    if (error.message === "El email ya está registrado") {
      return res.status(409).json({ success: false, message: error.message });
    }

    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const updatedUser = await userProcess.updateUser(
      id,
      name,
      email,
      password,
      role
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Usuario actualizado", updatedUser });
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userProcess.deleteUser(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
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
