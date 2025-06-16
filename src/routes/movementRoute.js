const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementController");
const validation = require("../validators/movementValidator");

router
  .get("/getMovements", movementController.getAllMovements)
  .get("/getMovement/:id", movementController.getMovementById)
  .post(
    "/createMovement",
    validation.createMovementValidator,
    movementController.createMovement
  )
  .patch("/updateMovement/:id", movementController.updateMovement)
  .delete("/deleteMovement/:id", movementController.deleteMovement);

module.exports = router;
