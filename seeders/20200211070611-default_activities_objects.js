'use strict';
const fse = require('fs-extra');
const path = require('path');
const toFolderName = require('../helpers/convertToFolderName');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await fse.readJSON(path.resolve(__dirname + '/data/activities_objects.json'));

    let list = data['objects'].map(async (d) => {

      // Creating corresponding folders without files
      await fse.ensureDir(path.join(__dirname, '../public/uploads/others/activities') + '/' + toFolderName(d.name));


      let company_id = await queryInterface.rawSelect('companies', {
        where: {
          name: d['company']
        },
      }, ['id']);

      const type_id = await queryInterface.rawSelect('partner_types', {
        where: {
          name: 'Activities'
        },
      }, ['id']);


      d['company_id'] = company_id;
      // d['type_id'] = type_id;
      delete d['company'];
      return d;
    });

    const results = await Promise.all(list);

    return queryInterface.bulkInsert('activities', results)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('activities', null, {});
  }
};
