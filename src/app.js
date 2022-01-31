const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { sequelize } = require("./models");
const router = require("./routes");
const errMid = require("./middlewares/ErrorMiddleware");

const { PORT } = require("./config");

const app = express();

app
  .use(morgan("common"))
  .use(cors())
  .use(cookieParser())
  .use(express.json())

  .use("/api/v1/auth", router.authRouter)
  .use("/api/v1/courses", router.courseRouter)
  .use("/api/v1/payment", router.paymentRouter)

  .use(errMid.errorHandler)
  .use(errMid.notFound);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await sequelize.authenticate();
  console.log("DB Connected!");
});
