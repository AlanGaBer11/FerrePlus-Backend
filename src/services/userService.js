const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../services/emailService");

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS (CON PAGINACIÓN)
const getAllUsers = async (page, limit) => {
  try {
    // Calcular el offset
    const offset = (page - 1) * limit;

    // Obtener usuarios con count y rows
    const { count, rows } = await User.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id_user", "ASC"]],
      attributes: { exclude: ["password"] }, // Excluir la contraseña de los resultados
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(count / limit);

    return {
      users: rows,
      totalUsers: count,
      totalPages: totalPages,
      currentPage: page,
    };
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

    // CREAR USUARIO PRIMERO
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Enviar correo de bienvenida DESPUÉS de crear el usuario
    try {
      const subject = "Bienvenido a FerrePlus";
      const text = `Hola ${name}, gracias por registrarte en FerrePlus. Tu cuenta ha sido creada exitosamente.`;
      const html = `
        <h1>¡Bienvenido ${name} a FerrePlus!</h1>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p>Para usar nuestros servicios, por favor activa tu cuenta.</p>
        <p>Gracias por elegirnos.</p>
      `;

      await sendEmail(email, subject, text, html);
      console.log(`Correo de bienvenida enviado a: ${email}`);
    } catch (emailError) {
      // No fallar el registro si el correo falla
      console.error("Error al enviar correo de bienvenida:", emailError);
    }

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// FUNCIÓN PARA HACER LOGIN
const loginUser = async (credentials) => {
  try {
    const { email, password } = credentials;
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

    // CREAR USUARIO PRIMERO
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Enviar correo de bienvenida DESPUÉS de crear el usuario
    try {
      const subject = "Cuenta creada en FerrePlus";
      const text = `Hola ${name}, tu cuenta de ${role} ha sido creada en FerrePlus.`;
      const html = `
        <h1>¡Cuenta creada ${name}!</h1>
        <p>Tu cuenta con rol de <strong>${role}</strong> ha sido creada exitosamente en FerrePlus.</p>
        <p>Ya puedes comenzar a usar nuestros servicios.</p>
        <p>Gracias por elegirnos.</p>
      `;

      await sendEmail(email, subject, text, html);
      console.log(`Correo de creación enviado a: ${email}`);
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

// FUNCIÓN PARA ENVIAR UN CÓDIGO DE VERIFICACIÓN
const sendVerificationCode = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("El usuario no existe");
    }

    // Verificar si el usuario ya está verificado
    if (user.verified) {
      throw new Error("El usuario ya está verificado");
    }

    // Generar código de 6 dígitos más seguro
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Establecer expiración del código (15 minutos)
    const codeExpiration = new Date();
    codeExpiration.setMinutes(codeExpiration.getMinutes() + 15);

    // Guardar código y expiración
    user.verificationCode = verificationCode;
    user.codeExpiration = codeExpiration;
    await user.save();

    // Enviar el código por correo electrónico
    const subject = "Código de Verificación - FerrePlus";
    const text = `Tu código de verificación es: ${verificationCode}. Este código expira en 15 minutos.`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Código de Verificación</h1>
        <p>Hola <strong>${user.name}</strong>,</p>
        <p>Tu código de verificación para FerrePlus es:</p>
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
          <h2 style="color: #007bff; font-size: 36px; margin: 0; letter-spacing: 5px;">${verificationCode}</h2>
        </div>
        <p><strong>Este código expira en 15 minutos.</strong></p>
        <p>Si no solicitaste este código, puedes ignorar este correo.</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Este es un correo automático, por favor no respondas.</p>
      </div>
    `;

    await sendEmail(email, subject, text, html);
    console.log(`Código de verificación enviado a: ${email}`);

    return { codeExpiration }; // Solo devolver datos necesarios
  } catch (error) {
    console.error("Error al enviar el código de verificación:", error);
    throw error;
  }
};

// FUNCIÓN PARA VERIFICAR CUENTA
const verifyCode = async (email, code) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar si el usuario ya está verificado
    if (user.verified) {
      throw new Error("El usuario ya está verificado");
    }

    // Verificar si hay un código pendiente
    if (!user.verificationCode) {
      throw new Error("No hay código de verificación pendiente");
    }

    // Verificar expiración del código
    if (user.codeExpiration && new Date() > user.codeExpiration) {
      // Limpiar código expirado
      user.verificationCode = null;
      user.codeExpiration = null;
      await user.save();
      throw new Error("El código de verificación ha expirado");
    }

    // Verificar que el código coincida
    if (user.verificationCode !== code) {
      throw new Error("Código de verificación inválido");
    }

    // Verificar la cuenta
    user.verified = true;
    user.verificationCode = null;
    user.codeExpiration = null;
    await user.save();

    // Enviar correo de confirmación
    try {
      const subject = "Cuenta Verificada Exitosamente - FerrePlus";
      const text = `¡Felicidades ${user.name}! Tu cuenta ha sido verificada con éxito.`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #28a745; text-align: center;">¡Cuenta Verificada!</h1>
          <p>¡Felicidades <strong>${user.name}</strong>!</p>
          <p>Tu cuenta de FerrePlus ha sido verificada exitosamente.</p>
          <p>Ya puedes acceder a todos nuestros servicios.</p>
          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #155724;"><strong>✅ Verificación completada</strong></p>
          </div>
          <p>¡Gracias por elegirnos!</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Equipo de FerrePlus</p>
        </div>
      `;

      await sendEmail(email, subject, text, html);
      console.log(`Correo de confirmación enviado a: ${email}`);
    } catch (emailError) {
      console.error("Error al enviar correo de confirmación:", emailError);
      // No fallar la verificación si el correo falla
    }

    return {
      id: user.id_user,
      name: user.name,
      email: user.email,
      verified: user.verified,
    };
  } catch (error) {
    console.error("Error al verificar el código:", error);
    throw error;
  }
};

// FUNCIÓN PARA REENVIAR CÓDIGO DE VERIFICACIÓN
const resendVerificationCode = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (user.verified) {
      throw new Error("El usuario ya está verificado");
    }

    // Verificar si ha pasado tiempo suficiente desde el último envío (60 segundos)
    if (user.codeExpiration && user.codeExpiration > new Date()) {
      const timeLeft = Math.ceil(
        (user.codeExpiration - new Date()) / 1000 / 60
      );
      throw new Error(
        `Debes esperar ${timeLeft} minutos antes de solicitar un nuevo código`
      );
    }

    // Reutilizar la función sendVerificationCode
    return await sendVerificationCode(email);
  } catch (error) {
    console.error("Error al reenviar código de verificación:", error);
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
  sendVerificationCode,
  verifyCode,
  resendVerificationCode,
};
