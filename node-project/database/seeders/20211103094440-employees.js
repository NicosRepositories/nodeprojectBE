'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'employees',
      [
        {
          firstname: 'New',
          employeeID: 999,
          lastname: 'Employee',
          nickname: 'Dummie',
          age: 35,
          mainoffice: 'TestOffice',
          timeatenersis: 1,
          happiness: 10,
          jobID: 11,
        },
        {
          firstname: 'New',
          employeeID: 1000,
          lastname: 'Employee2',
          nickname: 'Dummie2',
          age: 35,
          mainoffice: 'TestOffice',
          timeatenersis: 1,
          happiness: 10,
          jobID: 11,
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('employees', null, {}),
};
