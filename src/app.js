const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { sequelize } = require("./models");
const { authRouter } = require("./routes");
const handler = require("./utilities/middlewares");

const { PORT, SALT_ROUND } = require("./config");

const app = express();

app.use(morgan('common'))
app.use(express.json());
app.use('/api/v1/auth', authRouter);

app.use(handler.errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await sequelize.authenticate();
  console.log("DB Connected!");
});
