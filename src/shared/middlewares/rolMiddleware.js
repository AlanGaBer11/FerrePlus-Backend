const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      // El usuario ya debe estar disponible desde authMiddleware
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Usuario no autenticado",
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "No Tienes Permiso Para Realizar Esta Acción",
        });
      }

      next();
    } catch (error) {
      console.error("Error verificando rol:", error.message);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  };
};

module.exports = { checkRole };
