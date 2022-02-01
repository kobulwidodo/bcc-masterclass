"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserVisitors extends Model {
    static associate({ Users }) {
      this.belongsTo(Users, { foreignKey: "user_id", as: "users" });
      this.belongsTo(Users, { foreignKey: "visitor_id", as: "visitors" });
    }

    toJSON() {
      return { ...this.get(), user_id: undefined, visitor_id: undefined };
    }
  }
  UserVisitors.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      visitor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      visited_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserVisitors",
      tableName: "user_visitors",
      timestamps: false,
    }
  );
  return UserVisitors;
};
