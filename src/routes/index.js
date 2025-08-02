const express = require("express");
const router = express.Router();

// Importar rutas de módulos
const authRoutes = require("../modules/auth/routes/authRoutes");
const userRoutes = require("../modules/users/routes/userRoutes");
const productRoutes = require("../modules/products/routes/productRoutes");
const supplierRoutes = require("../modules/suppliers/routes/supplierRoutes");
const movementRoutes = require("../modules/movements/routes/movementRoutes");

// Configurar rutas
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/movements", movementRoutes);

module.exports = router;
