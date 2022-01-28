const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize } = require("./models");
const userController = require("./repositories/UserRepository");
const handler = require("./utilities/middlewares");

const { PORT, SALT_ROUND } = require("./config");

const app = express();

app.use(morgan('common'))
app.use(express.json());

app.post("/api/v1/", userController.addNewUser);

app.use(handler.errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await sequelize.authenticate();
  console.log("DB Connected!");
});
