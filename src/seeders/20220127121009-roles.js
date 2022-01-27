"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("roles", [
      { name: "admin" },
      { name: "user" },
      { name: "instructor" },
    ]),

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Currencies", {
      [Op.or]: [{ name: "admin" }, { name: "user" }, { name: "instructor" }],
    });
  },
};
