const bcrypt = require("bcrypt");
const { customAlphabet } = require("nanoid");
const { Users, Roles } = require("../models");
const { SALT_ROUND } = require("../config");
const errMsg = require("../utilities/errorMessages");
const { Op } = require("sequelize");

module.exports = {
  async addNewUser({ username, email, password, name, role_id }) {
    const user_id = customAlphabet(
      "0123456789abcdefghijklmnopqrstuvwxyz",
      10
    )();

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
