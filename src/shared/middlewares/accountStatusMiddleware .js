const checkAccountStatus = (req, res, next) => {
  try {
    // El usuario debe estar disponible desde authMiddleware
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }

    // Verificar si la cuenta está verificada
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Cuenta no verificada. Por favor verifica tu email.",
      });
    }

    // Verificar si la cuenta está activa
    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: "Cuenta desactivada. Contacta al administrador.",
      });
    }

    next();
  } catch (error) {
    console.error("Error verificando estado de cuenta:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

module.exports = { checkAccountStatus };
