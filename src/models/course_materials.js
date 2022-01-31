"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseMaterials extends Model {
    static associate({ CourseTopics }) {
      this.belongsTo(CourseTopics, {
        foreignKey: "topic_id",
        as: "topics",
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, topic_id: undefined };
    }
  }
  CourseMaterials.init(
    {
      material_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      video: DataTypes.STRING,
      file: DataTypes.STRING,
      topic_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "topics",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "CourseMaterials",
      tableName: "course_materials",
    }
  );
  return CourseMaterials;
};
