const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("../validators/userValidator");
const authentication = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/rolMiddleware");

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
    "/register",
    validation.registerUserValidator,
    userController.registerUser
  )
  .post("/login", validation.loginUserValidator, userController.loginUser)
  .patch("/updateUser/:id", authentication, userController.updateUser)
  .delete(
    "/deleteUser/:id",
    authentication,
    checkRole(["ADMIN"]),
    userController.deleteUser
  );

module.exports = router;
