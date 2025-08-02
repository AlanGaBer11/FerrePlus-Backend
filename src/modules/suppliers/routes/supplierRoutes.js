const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const validation = require("../validators/supplierValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");

router
  .get("/getSuppliers", authentication, supplierController.getAllSuppliers)
  .get("/getSupplier/:id", authentication, supplierController.getSupplierById)
  .post(
    "/createSupplier",
    authentication,
    checkRole(["ADMIN"]),
    validation.createSupplierValidator,
    supplierController.createSupplier
  )
  .patch(
    "/updateSupplier/:id",
    authentication,
    checkRole(["ADMIN"]),
    supplierController.updatedSupplier
  )
  .delete(
    "/deleteSupplier/:id",
    authentication,
    checkRole(["ADMIN"]),
    supplierController.deleteSupplier
  );

module.exports = router;
