const authRouter = require("express").Router();
const AuthController = require("../controllers/AuthController");

module.exports = authRouter
  .post("/register", AuthController.register)
  .post("/login", AuthController.login);
