"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      this.belongsTo(Users, { foreignKey: "instructor_id", as: "users" });
    }
  }
  Courses.init(
    {
      course_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Course name is required" },
          notNull: { msg: "Course name must exist" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Course description is required" },
          notNull: { msg: "Course description must exist" },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Course image is required" },
          notNull: { msg: "Course image must exist" },
        }
      },
      preview_video: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Preview video is required" },
          notNull: { msg: "Preview video must exist" },
        }
      },
      instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        validate: {
          notEmpty: { msg: "Instructor ID is required" },
          notNull: { msg: "Instructor ID must exist" },
        }
      },
    },
    {
      sequelize,
      modelName: "Courses",
      tableName: "courses",
    }
  );
  return Courses;
};
