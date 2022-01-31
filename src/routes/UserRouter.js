const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = userRouter.delete(
  "/deleteUser/:userId",
  authMid.authorizeLogin,
  authMid.authorizeRole([1]),
  UserController.deleteUserById
);
