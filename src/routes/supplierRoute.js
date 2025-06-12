const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const validation = require("../validators/supplierValidator");

router
  .get("/getSuppliers", supplierController.getAllSuppliers)
  .get("/getSupplier/:id", supplierController.getSupplierById)
  .post(
    "/createSupplier",
    validation.createSupplierValidator,
    supplierController.createSupplier
  )
  .patch(
    "/updateSupplier/:id",
    validation.createSupplierValidator,
    supplierController.updatedSupplier
  )
  .delete("/deleteSupplier/:id", supplierController.deleteSupplier);

module.exports = router;
