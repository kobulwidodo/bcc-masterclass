const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../config");
const { Op } = require("sequelize");

const { Users, Courses, CoursePayments } = require("../models");
const errMsg = require("../utilities/errorMessages");
const { getRandomId } = require("../utilities/getRandomId");

module.exports = {
  async addNewUser({ username, email, password, name, role_id }) {
    const user_id = getRandomId(10);

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(SALT_ROUND)
    );

    await Users.create({
      user_id,
      username,
      email,
      password: hashedPassword,
      name,
      role_id,
    });

    return { username, email, role_id };
  },

  async getIdByUserId(userId) {
    return await Users.findOne({
      where: { user_id: userId },
      attributes: ["id"],
    });
  },

  async getUser({ usernameOrEmail, password }) {
    if (usernameOrEmail == "") throw errMsg.nullValueError("Username or Email");
    if (password == "") throw errMsg.nullValueError("Password");

    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) throw errMsg.userNotFoundError();
    if (!(await bcrypt.compare(password, user.password)))
      throw errMsg.invalidPassword();

    return user;
  },

  async getUserById(userId) {
    const user = await Users.findOne({ where: { user_id: userId } });
    if (!user) throw errMsg.notFound("User");
    return user;
  },

  async deleteUserById(userId) {
    await Users.destroy({ where: { user_id: userId } });
  },

  async editProfile(payload, userId) {
    await Users.update(payload, { where: { user_id: userId } });
  },

  async getProfile(userId, isVisited) {
    const query = {
      where: { user_id: userId },
      attributes: { exclude: ["password", "role_id"] },
    };
    if (isVisited) query.attributes.exclude.push("email", "username");

    const user = await Users.findOne(query);
    if (!user) throw errMsg.notFound("User");
    return user;
  },
};
