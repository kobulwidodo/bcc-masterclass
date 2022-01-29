const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models");
const router = require("./routes");
const errMid = require("./middlewares/ErrorMiddleware");

const { PORT } = require("./config");

console.log(PORT);

const app = express();

app.use(morgan("common"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", router.authRouter);
app.use("/api/v1/courses", router.courseRouter);
app.use("/api/v1/payment", router.paymentRouter);

app.use(errMid.errorHandler);
app.use(errMid.notFound);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await sequelize.authenticate();
  console.log("DB Connected!");
});
