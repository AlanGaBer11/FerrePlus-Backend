const { check, validationResult } = require("express-validator");

const registerUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios"),

  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("La contraseña debe contener al menos un carácter especial")
    .custom((value) => {
      // Verificar números consecutivos
      for (let i = 0; i < value.length - 1; i++) {
        const current = parseInt(value[i]);
        const next = parseInt(value[i + 1]);

        if (!isNaN(current) && !isNaN(next) && next === current + 1) {
          throw new Error(
            "La contraseña no debe contener números consecutivos"
          );
        }
      }

      // Verificar letras consecutivas en el abecedario
      const lowerValue = value.toLowerCase();
      for (let i = 0; i < lowerValue.length - 1; i++) {
        const current = lowerValue.charCodeAt(i);
        const next = lowerValue.charCodeAt(i + 1);

        // Verificar solo si son letras y son consecutivas en el abecedario
        if (
          current >= 97 &&
          current <= 122 &&
          next >= 97 &&
          next <= 122 &&
          next === current + 1
        ) {
          throw new Error(
            "La contraseña no debe contener letras consecutivas del abecedario"
          );
        }
      }

      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

const loginUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido"),

  check("password").notEmpty().withMessage("La contraseña es obligatoria"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

const newUserValidaror = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("El nombre debe contener solo letras y espacios"),

  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("La contraseña debe contener al menos un carácter especial")
    .custom((value) => {
      // Verificar números consecutivos
      for (let i = 0; i < value.length - 1; i++) {
        const current = parseInt(value[i]);
        const next = parseInt(value[i + 1]);

        if (!isNaN(current) && !isNaN(next) && next === current + 1) {
          throw new Error(
            "La contraseña no debe contener números consecutivos"
          );
        }
      }

      // Verificar letras consecutivas en el abecedario
      const lowerValue = value.toLowerCase();
      for (let i = 0; i < lowerValue.length - 1; i++) {
        const current = lowerValue.charCodeAt(i);
        const next = lowerValue.charCodeAt(i + 1);

        // Verificar solo si son letras y son consecutivas en el abecedario
        if (
          current >= 97 &&
          current <= 122 &&
          next >= 97 &&
          next <= 122 &&
          next === current + 1
        ) {
          throw new Error(
            "La contraseña no debe contener letras consecutivas del abecedario"
          );
        }
      }

      return true;
    }),

  check("role")
    .notEmpty()
    .withMessage("El rol es obligatorio")
    .isIn(["ADMIN", "USER"])
    .withMessage("El rol debe ser ADMIN o USER"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  registerUserValidator,
  loginUserValidator,
  newUserValidaror,
};
