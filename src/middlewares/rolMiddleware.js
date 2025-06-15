const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'Token Requerido' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await UserModel.getUserById(decoded.id)

      if (!user) {
        return res.status(404).json({ message: 'Usuario No Encontrado' })
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: 'No Tienes Permiso Para Realizar Esta Acción'
        })
      }

      req.user = user
      next()
    } catch (error) {
      res.status(401).json({ message: 'Token Inválido' })
    }
  }
}

module.exports = { checkRole }
