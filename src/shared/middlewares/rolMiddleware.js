const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ succes: false, message: "Token Requerido" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res
          .status(404)
          .json({ succes: false, message: "Usuario No Encontrado" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          succes: false,
          message: "No Tienes Permiso Para Realizar Esta Acción",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error de autenticación:", error.message);
      res.status(401).json({ succes: false, message: "Token Inválido" });
    }
  };
};

module.exports = { checkRole };
