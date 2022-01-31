"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseTopics extends Model {

    static associate({ Courses, CourseMaterials }) {
      this.belongsTo(Courses, { foreignKey: "course_id", as: "courses" });
      this.hasMany(CourseMaterials, {
        foreignKey: "topic_id",
        as: "course_materials",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, course_id: undefined };
    }
  }
  CourseTopics.init(
    {
      topic_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name field is required" },
          notNull: { msg: "Name field must exist" },
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CourseTopics",
      tableName: "course_topics",
    }
  );
  return CourseTopics;
};
