'use strict';
require('../constants/main');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await fse.readJSON(path.resolve(__dirname + '/data/tour_types.json'));
    return queryInterface.bulkInsert('tours_type', data)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tours_type', null, {});
  }
};
