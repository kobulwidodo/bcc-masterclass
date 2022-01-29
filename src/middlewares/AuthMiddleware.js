const errMsg = require("../utilities/errorMessages");
const jwt = require("../utilities/tokenizer");
const { JWT_SECRET } = require("../config");

module.exports = {
  authorizeLogin(req, res, next) {
    const token = req.cookies.accessToken;
    try {
      if (!token) throw errMsg.notLoggedIn();

      const decoded = jwt.decodeToken(token);
      if (!decoded) throw errMsg.wrongAccessToken();

      const { userId, roleId } = decoded;
      [req.userId, req.roleId] = [userId, roleId];

      return next();
    } catch (error) {
      return next(error);
    }
  },

  authorizeRole(allowedRoles) {
    return (req, res, next) => {
      try {
        if (!allowedRoles.includes(parseInt(req.roleId)))
          throw errMsg.unauthorized();
        return next();
      } catch (error) {
        return next(error);
      }
    };
  },
};
