const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router
  .get("/getProducts", productController.getAllProducts)
  .get("/getProduct/:id", productController.getProductById)
  .post("/createProduct", productController.createProduct)
  .patch("/updateProduct/:id", productController.updateProduct)
  .delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
