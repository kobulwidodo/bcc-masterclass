const UserRepository = require("../repositories/UserRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");
const jwt = require("../utilities/tokenizer");
const { NODE_ENV } = require("../config");

const { ValidationError } = require("sequelize");

const getRoleName = (roleId) => {
  switch (roleId) {
    case 1:
      return "Admin";
    case 2:
      return "User";
    case 3:
      return "Instructor";
  }
};

module.exports = {
  async register(req, res, next) {
    const payload = req.body;
    const { password, confirmPassword, role_id } = payload;

    try {
      if (confirmPassword !== password) throw errMsg.confirmPasswordError();
      const user = await UserRepository.addNewUser(payload);
      return res
        .status(201)
        .send({ ...successMsg.register(getRoleName(role_id)), ...user });
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },

  async login(req, res, next) {
    const payload = req.body;

    try {
      const { user_id, role_id } = await UserRepository.getUser(payload);

      const token = jwt.encodeToken({ userId: user_id, roleId: role_id });

      return res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: NODE_ENV === "production",
        })
        .status(200)
        .send({
          ...successMsg.login(getRoleName(role_id)),
          userId: user_id,
        });
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },
};
