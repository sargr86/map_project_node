'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('positions', [
      {
        name: 'Director',
      },
      {
        name: 'Operator',
      },
      {
        name: 'Driver'
      },
      {
        name: 'Customer'
      },
      // {
      //     name_en: 'Operator'
      // }
    ])

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
