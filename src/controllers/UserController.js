const UserRepository = require("../repositories/UserRepository");
const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

const { ValidationError } = require("sequelize");

module.exports = {
  async deleteUserById(req, res, next) {
    const { userId } = req.params;

    try {
      const { role_id: roleId } = await UserRepository.getUserById(userId);
      if (roleId == 1) throw errMsg.deleteAdmin();

      await UserRepository.deleteUserById(userId);
      return res.status(200).send(successMsg.delete("user"));
    } catch (error) {
      return next(error);
    }
  },

  async editProfile(req, res, next) {
    const { userId } = req.params;
    const { userId: accountId } = req;
    const { name, profile_picture } = req.body;

    try {
      const { user_id } = await UserRepository.getUserById(userId);

      if (user_id !== accountId) throw errMsg.unauthorized();

      await UserRepository.editProfile({ name, profile_picture }, accountId);
      return res.status(200).send(successMsg.update("your profile"));
    } catch (error) {
      if (error instanceof ValidationError)
        return next(errMsg.validationError(error));
      return next(error);
    }
  },
};
