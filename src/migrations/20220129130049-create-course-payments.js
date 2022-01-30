"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("course_payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
        onDelete: "CASCADE",
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      payment_method: {
        type: DataTypes.ENUM("BCA", "BNI", "BRI", "MANDIRI", "FREE"),
        allowNull: false,
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("course_payments");
  },
};
