const paymentRouter = require("express").Router();
const PaymentController = require("../controllers/PaymentController");
const authMid = require("../middlewares/AuthMiddleware");

module.exports = paymentRouter.post(
  "/:courseId",
  authMid.authorizeLogin,
  authMid.authorizeRole([2]),
  PaymentController.createOrder
);
