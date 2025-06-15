const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const validation = require("../validators/productValidator");

router
  .get("/getProducts", productController.getAllProducts)
  .get("/getProduct/:id", productController.getProductById)
  .post(
    "/createProduct",
    validation.createProductValidator,
    productController.createProduct
  )
  .patch("/updateProduct/:id", productController.updateProduct)
  .delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
