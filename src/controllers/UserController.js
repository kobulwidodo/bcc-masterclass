const UserRepository = require("../repositories/userRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

const getRoleName = (roleId) => {
  switch (roleId) {
    case 1:
      return "admin";
    case 2:
      return "user";
    case 3:
      return "instructor";
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
};
