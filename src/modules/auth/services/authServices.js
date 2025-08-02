const User = require("../../../shared/models/userModel");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../../email/services/emailService");
const EmailTemplateService = require("../../email/services/emailTemplateService");

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
      role: "USER", // Por defecto es USER en auth
    });

    // Enviar correo de bienvenida usando templates
    try {
      const welcomeData = {
        name: user.name,
        email: user.email,
        role: user.role || "USER",
      };

      const { subject, text, html } =
        EmailTemplateService.getWelcomeEmail(welcomeData);
      await sendEmail(email, subject, text, html);
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
      throw new Error("El usuario no existe");
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
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

    // Enviar el código usando templates
    const verificationData = {
      name: user.name,
      verificationCode,
      codeExpiration,
    };

    const { subject, text, html } =
      EmailTemplateService.getVerificationEmail(verificationData);
    await sendEmail(email, subject, text, html);

    return { codeExpiration };
  } catch (error) {
    console.error("Error al enviar el código de verificación:", error);
    throw error;
  }
};

// FUNCIÓN PARA VERIFICAR CUENTA
const verifyAccount = async (email, code) => {
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

    // Enviar correo de confirmación usando templates
    try {
      const confirmationData = {
        name: user.name,
        email: user.email,
      };

      const { subject, text, html } =
        EmailTemplateService.getConfirmationEmail(confirmationData);
      await sendEmail(email, subject, text, html);
    } catch (emailError) {
      console.error("Error al enviar correo de confirmación:", emailError);
      // No fallar la verificación si el correo falla
    }

    return {
      id: user.id_user,
      name: user.name,
      email: user.email,
      verified: user.verified,
      role: user.role,
    };
  } catch (error) {
    console.error("Error al verificar el código:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyAccount,
};
