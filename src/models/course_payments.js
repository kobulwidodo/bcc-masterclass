"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoursePayments extends Model {
    static associate({ Users, Courses }) {
      this.belongsTo(Users, { foreignKey: "user_id", as: "users" });
      this.belongsTo(Courses, { foreignKey: "course_id", as: "courses" });
    }
  }
  CoursePayments.init(
    {
      payment_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        validate: {
          notEmpty: { msg: "User id is required" },
          notNull: { msg: "User id must exist" },
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        validate: {
          notEmpty: { msg: "Course id is required" },
          notNull: { msg: "Course id must exist" },
        },
      },
      payment_method: {
        type: DataTypes.ENUM("BCA", "BNI", "BRI", "MANDIRI"),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Payment method is required" },
          notNull: { msg: "Payment method must exist" },
          isIn: {
            args: [["BCA", "BNI", "BRI", "MANDIRI"]],
            msg: "Payment method not available",
          },
        },
      },
      payment_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CoursePayments",
      tableName: "course_payments",
    }
  );
  return CoursePayments;
};
