const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = userRouter
  .delete(
    "/:userId",
    authMid.authorizeLogin,
    authMid.authorizeRole([1]),
    UserController.deleteUserById
  )
  .put("/:userId", authMid.authorizeLogin, UserController.editProfile);
