const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementController");
const validation = require("../validators/movementValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");

router
  .get("/getMovements", authentication, movementController.getAllMovements)
  .get("/getMovement/:id", authentication, movementController.getMovementById)
  .post(
    "/createMovement",
    authentication,
    checkRole(["ADMIN"]),
    validation.createMovementValidator,
    movementController.createMovement
  )
  .patch(
    "/updateMovement/:id",
    authentication,
    checkRole(["ADMIN"]),
    movementController.updateMovement
  )
  .delete(
    "/deleteMovement/:id",
    authentication,
    checkRole(["ADMIN"]),
    movementController.deleteMovement
  );

module.exports = router;
