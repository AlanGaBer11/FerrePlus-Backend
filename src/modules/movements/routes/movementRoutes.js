const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementController");
const validation = require("../validators/movementValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");
const {
  checkAccountStatus,
} = require("../../../shared/middlewares/accountStatusMiddleware ");

router
  .get(
    "/getMovements",
    authentication,
    checkAccountStatus,
    movementController.getAllMovements
  )
  .get(
    "/getMovement/:id",
    authentication,
    checkAccountStatus,
    movementController.getMovementById
  )
  .post(
    "/createMovement",
    validation.createMovementValidator,
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    movementController.createMovement
  )
  .patch(
    "/updateMovement/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    movementController.updateMovement
  )
  .delete(
    "/deleteMovement/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    movementController.deleteMovement
  );

module.exports = router;
