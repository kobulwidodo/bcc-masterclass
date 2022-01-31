const authRouter = require("express").Router();
const AuthController = require("../controllers/UserController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = authRouter
  .post("/register", AuthController.register)
  .post("/login", AuthController.login)
  .delete(
    "/deleteUser/:userId",
    authMid.authorizeLogin,
    authMid.authorizeRole([1]),
    AuthController.deleteUserById
  );
