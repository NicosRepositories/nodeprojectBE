'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('employees', {
      firstname: {
        type: Sequelize.STRING,
      },
      employeeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      mainoffice: {
        type: Sequelize.STRING,
      },
      timeatenersis: {
        type: Sequelize.INTEGER,
      },
      happiness: {
        type: Sequelize.INTEGER,
      },
      jobID: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employees');
  },
};
