require("dotenv").config({ path: "../.env" });

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT),
  SALT_ROUND: parseInt(process.env.SALT_ROUND),
  ADMIN_PASSWORD: process.env.ADMIN_PASWORD,
  JWT_SECRET: process.env.ACCESS_TOKEN_SECRET,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};
