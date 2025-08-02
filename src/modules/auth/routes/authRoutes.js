const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validation = require("../validators/authValidator");

router
  .post(
    "/register",
    validation.registerUserValidator,
    authController.registerUser
  )
  .post("/login", validation.loginUserValidator, authController.loginUser)
  .post("/send-verification-code", authController.sendVerificationCode)
  .post("/verify-account", authController.verifyAccount);

module.exports = router;
