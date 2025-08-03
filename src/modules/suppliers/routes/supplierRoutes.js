const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const validation = require("../validators/supplierValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");
const {
  checkAccountStatus,
} = require("../../../shared/middlewares/accountStatusMiddleware ");

router
  .get(
    "/getSuppliers",
    authentication,
    checkAccountStatus,
    supplierController.getAllSuppliers
  )
  .get(
    "/getSupplier/:id",
    authentication,
    checkAccountStatus,
    supplierController.getSupplierById
  )
  .post(
    "/createSupplier",
    validation.createSupplierValidator,
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    supplierController.createSupplier
  )
  .patch(
    "/updateSupplier/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    supplierController.updatedSupplier
  )
  .delete(
    "/deleteSupplier/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    supplierController.deleteSupplier
  );

module.exports = router;
