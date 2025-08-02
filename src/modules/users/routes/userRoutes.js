const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("../validators/userValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");

router
  .get(
    "/getUsers",
    authentication,
    checkRole(["ADMIN"]),
    userController.getAllUsers
  )
  .get(
    "/getUser/:id",
    authentication,
    checkRole(["ADMIN"]),
    userController.getUserById
  )

  .post(
    "/createUser",
    validation.newUserValidaror,
    authentication,
    checkRole(["ADMIN"]),
    userController.createUser
  )
  .patch("/updateUser/:id", authentication, userController.updateUser)
  .delete(
    "/deleteUser/:id",
    authentication,
    checkRole(["ADMIN"]),
    userController.deleteUser
  );

module.exports = router;
