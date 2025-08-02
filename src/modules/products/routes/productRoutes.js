const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validation = require("../validators/productValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");

router
  .get("/getProducts", authentication, productController.getAllProducts)
  .get("/getProduct/:id", authentication, productController.getProductById)
  .post(
    "/createProduct",
    authentication,
    checkRole(["ADMIN"]),
    validation.createProductValidator,
    productController.createProduct
  )
  .patch(
    "/updateProduct/:id",
    authentication,
    checkRole(["ADMIN"]),
    productController.updateProduct
  )
  .delete(
    "/deleteProduct/:id",
    authentication,
    checkRole(["ADMIN"]),
    productController.deleteProduct
  );

module.exports = router;
