const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../config");
const { Op } = require("sequelize");

const { Users, Courses, CoursePayments, UserVisitors } = require("../models");
UserVisitors.removeAttribute("id");
const db = require("../models");
const { QueryTypes } = require("sequelize");

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

  async addNewVisitor(userId, visitorId) {
    const isVisited = await UserVisitors.findOne({
      where: { visitor_id: visitorId },
    });

    const visitedAt = new Date();
    if (isVisited) {
      await UserVisitors.update(
        { visited_at: visitedAt },
        { where: { user_id: userId, visitor_id: visitorId } }
      );
      return;
    }

    await UserVisitors.create({
      user_id: userId,
      visitor_id: visitorId,
      visited_at: visitedAt,
    });
  },

  async getRecentVisitors(userId) {
    return await UserVisitors.findAll({
      where: { user_id: userId },
      include: {
        model: Users,
        as: "visitors",
        attributes: ["user_id", "name", "profile_picture"],
      },
      order: [["visited_at", "DESC"]],
      limit: 3,
    });
  },
};
