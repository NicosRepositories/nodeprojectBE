'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employees', 'createdAt');
    await queryInterface.removeColumn('employees', 'updatedAt');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employees', 'createdAt', {
      allowNull: true,
      type: Sequelize.DOUBLE,
    });
    await queryInterface.addColumn('employees', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DOUBLE,
    });
  },
};
