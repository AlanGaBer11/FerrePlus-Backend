const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../validators/userValidator");
const authentication = require("../../../shared/middlewares/authMiddleware");
const { checkRole } = require("../../../shared/middlewares/rolMiddleware");
const {
  checkAccountStatus,
} = require("../../../shared/middlewares/accountStatusMiddleware ");

router
  .get(
    "/getUsers",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    userController.getAllUsers
  )
  .get(
    "/getUser/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    userController.getUserById
  )
  .post(
    "/createUser",
    validator.newUserValidator,
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    userController.createUser
  )
  .patch(
    "/updateUser/:id",
    authentication,
    checkAccountStatus,
    userController.updateUser
  )
  .delete(
    "/deleteUser/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    userController.deleteUser
  )
  .patch(
    "/deactivateUser/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    userController.deactivateUser
  )
  .patch(
    "/reactivateUser/:id",
    authentication,
    checkAccountStatus,
    checkRole(["ADMIN"]),
    userController.reactivateUser
  );

module.exports = router;
