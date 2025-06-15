const { check, validationResult } = require("express-validator");

const createSupplierValidator = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El nombre debe tener al menos 8 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios"),

  check("phone")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .isLength({ min: 10 })
    .withMessage("El teléfono debe tener al menos 10 caracteres")
    .matches(/^\d+$/)
    .withMessage("El teléfono debe contener solo números"),

  check("address")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La dirección debe tener al menos 10 caracteres")
    .matches(/^[a-zA-Z0-9\s,.#-]+$/)
    .withMessage(
      "La dirección debe contener solo letras, números y caracteres especiales como , . # -"
    ),

  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { createSupplierValidator };
