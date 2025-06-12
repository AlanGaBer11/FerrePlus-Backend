const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router
  .get("/getSuppliers", supplierController.getAllSuppliers)
  .get("/getSupplier/:id", supplierController.getSupplierById)
  .post("/createSupplier", supplierController.createSupplier)
  .patch("/updateSupplier/:id", supplierController.updatedSupplier)
  .delete("/deleteSupplier/:id", supplierController.updatedSupplier);

module.exports = router;
