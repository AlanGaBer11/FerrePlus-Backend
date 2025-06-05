const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("../validators/userValidator");

router
  .get("/getUsers", userController.getAllUsers)
  .get("/getUser/:id", userController.getUserById)
  .post(
    "/register",
    validation.registerUserValidator,
    userController.registerUser
  )
  .post("/login", validation.loginUserValidator, userController.loginUser)
  .patch("/updateUser/:id", userController.updateUser)
  .delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
