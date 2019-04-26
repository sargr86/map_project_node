'use strict';
require('../constants/main');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        const data = await fse.readJSON(path.resolve(__dirname + '/data/partner_types.json'));
        return queryInterface.bulkInsert('partner_types', data)
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('partner_types', null, {});
    }
};
