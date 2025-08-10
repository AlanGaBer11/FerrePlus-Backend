const authServices = require("../services/authServices");

const registerUser = async (userData) => {
  try {
    const newUser = await authServices.registerUser(userData);
    return newUser;
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    throw err;
  }
};

const loginUser = async (credentials) => {
  try {
    const user = await authServices.loginUser(credentials);
    return user;
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    throw err;
  }
};

const sendVerificationCode = async (email) => {
  try {
    const result = await authServices.sendVerificationCode(email);
    return result;
  } catch (error) {
    console.error("Error al enviar el código de verificación:", error);
    throw error;
  }
};

const verifyAccount = async (email, code) => {
  try {
    const result = await authServices.verifyAccount(email, code);
    return result;
  } catch (error) {
    console.error("Error al verificar el código:", error);
    throw error;
  }
};

const requestPasswordReset = async (email) => {
  try {
    const result = await authServices.requestPasswordReset(email);
    return result;
  } catch (error) {
    console.error("Error al solicitar reseteo:", error);
    throw error;
  }
};

const resetPassword = async (email, token, newPassword) => {
  try {
    const result = await authServices.resetPassword(email, token, newPassword);
    return result;
  } catch (error) {
    console.error("Error al resetear contraseña:", error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendVerificationCode,
  verifyAccount,
  requestPasswordReset,
  resetPassword,
};
