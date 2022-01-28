const bcrypt = require("bcrypt");
const { customAlphabet } = require("nanoid");
const { Users, Roles } = require("../models");
const { SALT_ROUND } = require("../config");

const successMsg = require("../utilities/successMessages");
const errMsg = require("../utilities/errorMessages");

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
  // async addNewUser(req, res, next) {
  //   const { username, email, password, confirmPassword, name, role_id } =
  //     req.body;
  //   const profile_picture = req.body.profile_picture || null;

  //   const user_id = customAlphabet(
  //     "0123456789abcdefghijklmnopqrstuvwxyz",
  //     10
  //   )();

  //   if (confirmPassword !== password)
  //     return next(errMsg.confirmPasswordError());

  //   const role = getRoleName(role_id);

  //   try {
  //     const hashedPassword = await bcrypt.hash(
  //       password,
  //       await bcrypt.genSalt(SALT_ROUND)
  //     );

  //     const user = {
  //       user_id,
  //       username,
  //       password: hashedPassword,
  //       email,
  //       name,
  //       role_id,
  //     };

  //     if (profile_picture) user.profile_picture = profile_picture;

  //     await Users.create(user);

  //     console.log(hashedPassword, user_id);
  //     return res.status(201).send({
  //       message: successMsg.register(role),
  //       username,
  //       email,
  //       role,
  //     });
  //   } catch (err) {
  //     if (err instanceof ValidationError)
  //       return next(errMsg.validationError(err));
  //   }
  // },
  async addNewUser(payload) {
    const { username, email, password, name, role_id } = payload;

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
};
