'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVisitors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserVisitors.init({
    user_id: DataTypes.INTEGER,
    visitor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserVisitors',
    tableName: 'user_visitors'
  });
  return UserVisitors;
};