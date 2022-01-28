const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = {
  encodeToken(user) {
    console.log(JWT_SECRET);
    return jwt.sign(user, JWT_SECRET);
  },

  decodeToken(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};
