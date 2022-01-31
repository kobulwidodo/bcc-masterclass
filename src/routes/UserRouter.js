const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = userRouter
  .get("/:userId", authMid.authorizeLogin, UserController.viewProfile)
  .put("/:userId", authMid.authorizeLogin, UserController.editProfile)
  .delete(
    "/:userId",
    authMid.authorizeLogin,
    authMid.authorizeRole([1]),
    UserController.deleteUserById
  );
