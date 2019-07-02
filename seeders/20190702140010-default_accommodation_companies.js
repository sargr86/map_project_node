'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await fse.readJSON(path.resolve(__dirname + '/data/accommodation_companies.json'));

    const type_id = await queryInterface.rawSelect('partner_types', {
      where: {
        name: 'Accommodation'
      },
    }, ['id']);

    data['companies'].map(d => {
      d['type_id'] = type_id;
      d['created_at'] = new Date();
      d['updated_at'] = new Date();
    });


    return queryInterface.bulkInsert('companies', data['companies'])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
