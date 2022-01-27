const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize } = require("./models");

const { PORT } = require("./config");

const app = express();

app.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await sequelize.authenticate();
  console.log("DB Connected!");
});
