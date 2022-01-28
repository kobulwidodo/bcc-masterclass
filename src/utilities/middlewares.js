const errMsg = require("../utilities/errorMessages");
const jwt = require("./tokenizer");
const { JWT_SECRET } = require("../config");

module.exports = {
  authorizeUser(req, res, next) {
    const token = req.cookies.accessToken;
    try {
      if (!token) throw errMsg.notLoggedIn();
      const { userId, roleId } = jwt.decodeToken(token, JWT_SECRET);
      [req.userId, req.roleId] = [userId, roleId];
      return next();
    } catch (err) {
      return next(err);
    }
  },

  authorizeRole(allowedRoles) {
    return (req, res, next) => {
      try {
        if (!allowedRoles.includes(parseInt(req.roleId)))
          throw errMsg.unauthorized();
        return next();
      } catch (err) {
        return next(err);
      }
    };
  },

  errorHandler(err, req, res, next) {
    console.error(err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Internal Server Error" });
  },
};
