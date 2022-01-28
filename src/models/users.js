"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Roles }) {
      this.belongsTo(Roles, { foreignKey: "role_id", as: "roles" });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Userneme field is required" },
          notNull: { msg: "Username field must exist" },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          is: {
            args: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
            msg:
              "Password must be at least 6 characters long and contains" +
              " at least one number, one uppercase and one lowercase letter",
          },
          notEmpty: { msg: "Password field is required" },
          notNull: { msg: "Password field must exist" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email field is required" },
          notNull: { msg: "Email field must exist" },
          isEmail: { msg: "Email field must be a valid email" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name field is required" },
          notNull: { msg: "Name field must exist" },
        },
      },
      profile_picture: {
        type: DataTypes.STRING,
        defaultValue: "userProfile/default.png",
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        validate: {
          notEmpty: { msg: "Role field is required" },
          notNull: { msg: "Role field must exist" },
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
