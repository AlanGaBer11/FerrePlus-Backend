const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Hay Usuarios" });
    }
    res
      .status(200)
      .json({ success: true, message: "Usuarios Obtenidos", users });
  } catch (error) {
    console.error("Error Al Obtener Los Usuarios", error);
    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario No Encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario Obtenido", user });
  } catch (error) {
    console.error("Error Al Obtener El Usuario", error);
    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Los Datos Son Obligatorios" });
    }
    const newUser = await userService.registerUser(name, email, password);
    res
      .status(201)
      .json({ success: true, message: "Usuario Registrado", user: newUser });
  } catch (error) {
    console.error("Error Al Registrar El Usuario", error);

    // Si es un error de email duplicado
    if (error.message === "El Email Ya Está Registrado") {
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
        .json({ success: false, message: "Email y Password Son Obligatorios" });
    }
    const user = await userService.loginUser(email, password);
    // Generar token
    const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      success: true,
      message: "Inicio De Sesión Exitoso",
      token,
      user,
    });
  } catch (error) {
    console.error("Error Al Iniciar Sesión", error);
    // Si el error es de autenticación, enviamos 401
    if (
      error.message === "El Usuario No Existe" ||
      error.message === "Contraseña Incorrecta"
    ) {
      return res.status(401).json({ success: false, message: error.message });
    }

    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await userService.updateUser(id, name, email, password);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario No Encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Usuario Actualizado", updatedUser });
  } catch (error) {
    console.error("Error Al Actualizar El Usuario", error);
    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario No Encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario Eliminado" });
  } catch (error) {
    console.error("Error Al Eliminar El Usuario", error);
    res
      .status(500)
      .json({ success: false, message: "Error Interno Del Servidor" });
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
