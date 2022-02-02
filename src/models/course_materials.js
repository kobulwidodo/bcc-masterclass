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
        validate: {
          notEmpty: { msg: "Material's title is required" },
          notNull: { msg: "Material's title must exist" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Material's name is required" },
          notNull: { msg: "Material's name must exist" },
        },
      },
      video: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Material's video is required" },
          notNull: { msg: "Material's video must exist" },
        },
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Material's file is required" },
          notNull: { msg: "Material's file must exist" },
        },
      },
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
