'use strict';
const fse = require('fs-extra');
const path = require('path');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await fse.readJSON(path.resolve(__dirname + '/data/ferry_directions_pricing.json'));

    data['ferry_directions_pricing'].map(d => {
      d['created_at'] = new Date();
      d['updated_at'] = new Date();
    });

    return queryInterface.bulkInsert('ferry_directions_pricing', data['ferry_directions_pricing'], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ferry_directions_pricing', null, {});
  }
};
