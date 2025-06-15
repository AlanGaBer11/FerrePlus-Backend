const { check, validationResult } = require("express-validator");

const createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios"),

  check("category")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isLength({ min: 5 })
    .withMessage("La categoría debe tener al menos 5 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("La categoría debe contener solo letras y espacios"),
  /*.isIn(["Electronics", "Clothing", "Food", "Books", "Furniture"])*/
  check("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isLength({ min: 1 })
    .withMessage("El precio debe tener al menos 1 caracter")
    .isInt({ min: 0 })
    .withMessage("El precio debe de ser un número no negativo")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage(
      "El precio debe ser un número válido, con hasta dos decimales"
    ),

  check("stock")
    .notEmpty()
    .withMessage("El stock es obligatorio")
    .isLength({ min: 1 })
    .withMessage("El stock debe tener al menos 1 caracter")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero no negativo"),

  check("id_supplier")
    .notEmpty()
    .withMessage("El id del proveedor es obligatorio"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { createProductValidator };
