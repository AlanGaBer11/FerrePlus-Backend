const User = require("../../../shared/models/userModel");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../email/services/emailService");
const EmailTemplateService = require("../../email/services/emailTemplateService");

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS (CON PAGINACIÓN)
const getAllUsers = async (page = 1, limit = 10) => {
  try {
    // Validar paginación simple
    const validPage = Math.max(1, parseInt(page) || 1);
    const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));

    // Calcular el offset
    const offset = (validPage - 1) * validLimit;

    // Obtener usuarios con count y rows
    const { count, rows } = await User.findAndCountAll({
      limit: validLimit,
      offset: offset,
      order: [["id_user", "DESC"]], // Más recientes primero
      attributes: { exclude: ["password", "verificationCode"] }, // Excluir datos sensibles
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(count / validLimit);

    return {
      users: rows,
      pagination: {
        currentPage: validPage,
        totalPages,
        totalItems: count,
        itemsPerPage: validLimit,
        hasNextPage: validPage < totalPages,
        hasPrevPage: validPage > 1,
      },
    };
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// FUNCIÓN PARA OBTENER UN USUARIO POR ID
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password", "verificationCode"] },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA CREAR UN USUARIO (SOLO ADMIN)
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
      verified: role !== "USER", // Admin esta verificado por defecto
      status: true, // Activo por defecto
    });

    // Enviar correo usando templates
    try {
      const welcomeData = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const { subject, text, html } =
        EmailTemplateService.getWelcomeEmail(welcomeData);
      await sendEmail(email, subject, text, html);
    } catch (emailError) {
      // No fallar la creación si el correo falla
      console.error("Error al enviar correo de creación:", emailError);
    }
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
    await user.update({
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

    await user.destroy();
    return user;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA DESACTIVAR UN USUARIO
const deactivateUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Soft delete - cambiar status a false
    await user.update({ status: false });

    return user;
  } catch (error) {
    console.error("Error al desactivar el usuario:", error);
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
};
