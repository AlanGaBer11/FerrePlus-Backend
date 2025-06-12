const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("../validators/userValidator");
const authenticateUser = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/rolMiddleware");

router
  .get(
    "/getUsers",
    authenticateUser,
    checkRole(["ADMIN"]),
    userController.getAllUsers
  )
  .get("/getUser/:id", userController.getUserById)
  .post(
    "/register",
    validation.registerUserValidator,
    userController.registerUser
  )
  .post("/login", validation.loginUserValidator, userController.loginUser)
  .patch("/updateUser/:id", userController.updateUser)
  .delete(
    "/deleteUser/:id",
    authenticateUser,
    checkRole(["ADMIN"]),
    userController.deleteUser
  );

module.exports = router;
