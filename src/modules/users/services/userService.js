const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../email/services/emailService");
const EmailTemplateService = require("../../email/services/emailTemplateService");
const RepositoryConfig = require("../../../shared/config/repository");

class UserService {
  constructor() {
    this.userRepository = RepositoryConfig.getRepository("user");
  }

  // FUNCIÓN PARA OBTENER TODOS LOS USUARIOS (CON PAGINACIÓN)
  async getAllUsers(page = 1, limit = 10) {
    try {
      return await this.userRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  // FUNCIÓN PARA OBTENER UN USUARIO POR ID
  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  // FUNCIÓN PARA CREAR UN USUARIO (SOLO ADMIN)
  async createUser(userData) {
    try {
      const { password, role } = userData;

      // HASHEAMOS LA CONTRASEÑA
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Preparar datos del usuario
      const userToCreate = {
        ...userData,
        password: hashedPassword,
        verified: role !== "USER", // Admin esta verificado por defecto
        status: true, // Activo por defecto
      };

      // CREAR USUARIO usando el repositorio
      const user = await this.userRepository.create(userToCreate);

      // Enviar correo usando templates
      try {
        const { subject, text, html } = EmailTemplateService.getWelcomeEmail({
          name: user.name,
          email: user.email,
          role: user.role,
        });
        await sendEmail(user.email, subject, text, html);
      } catch (emailError) {
        console.error("Error al enviar correo de creación:", emailError);
      }

      return user;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  // FUNCIÓN PARA ACTUALIZAR UN USUARIO
  async updateUser(id, userData) {
    try {
      const { password } = userData;
      let dataToUpdate = { ...userData };

      // Hashear la nueva contraseña si se proporciona
      if (password) {
        const salt = await bcrypt.genSalt(10);
        dataToUpdate.password = await bcrypt.hash(password, salt);
      }

      const user = await this.userRepository.update(id, dataToUpdate);
      return user;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  // FUNCIÓN PARA ELIMINAR UN USUARIO
  async deleteUser(id) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }

  // FUNCIÓN PARA DESACTIVAR UN USUARIO
  async deactivateUser(id) {
    try {
      const user = await this.userRepository.deactivate(id);

      // Enviar correo de notificación usando template
      try {
        const { subject, text, html } = EmailTemplateService.getdeactivateEmail(
          {
            name: user.name,
            email: user.email,
            disabledAt: new Date(),
          }
        );
        await sendEmail(user.email, subject, text, html);
      } catch (emailError) {
        console.error("Error al enviar correo de desactivación:", emailError);
      }

      return user;
    } catch (error) {
      console.error("Error al desactivar el usuario:", error);
      throw error;
    }
  }

  // FUNCIÓN PARA REACTIVAR CUENTA
  async reactivateUser(id) {
    try {
      const user = await this.userRepository.reactivate(id);

      // Enviar correo de reactivación usando template
      try {
        const { subject, text, html } = EmailTemplateService.getReactivateEmail(
          {
            name: user.name,
            email: user.email,
            reactiveAt: new Date(),
          }
        );
        await sendEmail(user.email, subject, text, html);
      } catch (emailError) {
        console.error("Error al enviar correo de reactivación:", emailError);
      }

      return user;
    } catch (error) {
      console.error("Error al activar el usuario:", error);
      throw error;
    }
  }
}

module.exports = new UserService();
