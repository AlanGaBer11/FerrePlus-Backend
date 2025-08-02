const authProcess = require("../processes/authProcess");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newUser = await authProcess.registerUser({ name, email, password });
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
    const user = await authProcess.loginUser({ email, password });
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

const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "El email es requerido",
      });
    }

    const result = await authProcess.sendVerificationCode(email);

    res.status(200).json({
      success: true,
      message: "Código de verificación enviado",
      codeExpiration: result.codeExpiration,
    });
  } catch (error) {
    console.error("Error al enviar código de verificación:", error);

    // Manejar errores específicos
    if (error.message === "El usuario no existe") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "El usuario ya está verificado") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email y código son requeridos",
      });
    }

    const result = await authProcess.verifyAccount(email, code);

    res.status(200).json({
      success: true,
      message: "Código verificado correctamente",
      user: result.user,
    });
  } catch (error) {
    console.error("Error al verificar código:", error);

    // Manejar errores específicos
    if (
      error.message === "Usuario no encontrado" ||
      error.message === "El usuario ya está verificado" ||
      error.message === "No hay código de verificación pendiente" ||
      error.message === "El código de verificación ha expirado" ||
      error.message === "Código de verificación inválido"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyAccount,
};
