const jwt = require("jsonwebtoken");
const { JWT_SECRET, TOKEN_EXPIRES_IN } = require("../config");

module.exports = {
  encodeToken(user) {
    console.log(JWT_SECRET);
    return jwt.sign(user, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
  },

  decodeToken(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};
