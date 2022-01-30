"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseTopics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Courses }) {
      this.belongsTo(Courses, { foreignKey: "course_id", as: "courses" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  CourseTopics.init(
    {
      topic_id: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name field is required" },
          notNull: { msg: "Name field must exist" },
        }
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
