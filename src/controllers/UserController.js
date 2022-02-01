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

  async viewProfile(req, res, next) {
    const { userId } = req.params;
    const { userId: accountId } = req;

    try {
      const { dataValues: user } = await UserRepository.getProfile(
        userId,
        userId !== accountId
      );

      if (accountId !== userId) {
        const { id: accountSecretId } = await UserRepository.getUserById(
          accountId
        );
        await UserRepository.addNewVisitor(user.id, accountSecretId);
      }
      const visitor = await UserRepository.getRecentVisitors(user.id);
      console.log(visitor);
      return res.status(200).send({
        ...user,
        id: undefined,
        recent_visitors: visitor,
      });
    } catch (error) {
      return next(error);
    }
  },

  async getUserCourses(req, res, next) {
    const { userId } = req.params;
    const { userId: accountId } = req;

    try {
      if (userId !== accountId) throw errMsg.unauthorized();
      const courses = await UserRepository.getUserCourses(userId);
      return res.status(200).send(courses);
    } catch (error) {
      return next(error);
    }
  },
};
