"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Roles, Courses, CoursePayments, UserVisitors }) {
      this.belongsTo(Roles, { foreignKey: "role_id", as: "roles" });
      this.hasMany(Courses, { foreignKey: "course_id", as: "courses" });
      this.hasMany(CoursePayments, {
        foreignKey: "user_id",
        as: "followed_courses",
      });
      this.hasMany(UserVisitors, { foreignKey: "user_id", as: "users" });
      this.hasMany(UserVisitors, { foreignKey: "visitor_id", as: "visitors" });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
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
