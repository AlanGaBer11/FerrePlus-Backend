const { check, validationResult } = require('express-validator')

const createMovementValidator = [
  check('type')
    .notEmpty()
    .withMessage('El tipo de movimiento es obligatorio')
    .isIn(['Entrada', 'Salida'])
    .withMessage('El tipo de movimiento debe ser "Entrada" o "Salida"'),

  check('quantity')
    .notEmpty()
    .withMessage('La cantidad es obligatorio')
    .isLength({ min: 1 })
    .withMessage('La cantidad debe tener al menos 1 caracter')
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),

  check('date')
    .notEmpty()
    .withMessage('La fecha es obligatoria')
    .isISO8601()
    .withMessage('La fecha debe estar en formato ISO 8601 (YYYY-MM-DD)'),

  check('comments')
    .notEmpty()
    .withMessage('Los comentarios son obligatorios')
    .isLength({ min: 10 })
    .withMessage('Los comentarios deben tener al menos 10 caracteres')
    .isString()
    .withMessage('Los comentarios deben ser una cadena de texto'),

  check('id_product')
    .notEmpty()
    .withMessage('El id del producto es obligatorio'),

  check('id_user').notEmpty().withMessage('El id del usuario es obligatorio'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    next()
  }
]

module.exports = { createMovementValidator }
