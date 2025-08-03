const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validation = require("../validators/productValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");
const {
  checkAccountStatus,
} = require("../../../shared/middlewares/accountStatusMiddleware ");

router
  .get(
    "/getProducts",
    authentication,
    checkAccountStatus,
    productController.getAllProducts
  )
  .get(
    "/getProduct/:id",
    authentication,
    checkAccountStatus,
    productController.getProductById
  )
  .post(
    "/createProduct",
    validation.createProductValidator,
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    productController.createProduct
  )
  .patch(
    "/updateProduct/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    productController.updateProduct
  )
  .delete(
    "/deleteProduct/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    productController.deleteProduct
  );

module.exports = router;
