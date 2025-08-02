const userProcess = require("../processes/userProcess");

const getAllUsers = async (req, res) => {
  try {
    // Obtener parámetros de paginación de la query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validar que los valores sean positivos
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Los parámetros page y limit deben ser números positivos",
      });
    }

    // Limitar el máximo de elementos por página
    const maxLimit = 100;
    const finalLimit = limit > maxLimit ? maxLimit : limit;

    // Obtener usuarios con paginación
    const result = await userProcess.getAllUsers(page, finalLimit);

    if (!result.users || result.users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hay usuarios en esta página",
      });
    }

    res.status(200).json({
      success: true,
      message: "Usuarios obtenidos",
      users: result.users,
      pagination: {
        currentPage: page,
        totalPages: result.totalPages,
        totalUsers: result.totalUsers,
        usersPerPage: finalLimit,
        hasNextPage: page < result.totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
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

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newUser = await userProcess.createUser({
      name,
      email,
      password,
      role,
    });
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
    const { name, email, password, role } = req.body;
    const updatedUser = await userProcess.updateUser(req.params.id, {
      name,
      email,
      password,
      role,
    });
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
  createUser,
  updateUser,
  deleteUser,
};
