"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate({ Users }) {
      this.hasMany(Users, { foreignKey: "role_id", as: "roles" });
    }
  }
  Roles.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "roles",
    }
  );
  return Roles;
};
