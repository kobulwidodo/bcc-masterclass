const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../config");
const { Op } = require("sequelize");

const { Users } = require("../models");
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
};
