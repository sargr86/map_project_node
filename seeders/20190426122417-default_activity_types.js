'use strict';
require('../constants/main');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = await fse.readJSON(path.resolve(__dirname + '/data/activity_types.json'));
        data.map(d => {
            delete d.subtypes;
        });
        return queryInterface.bulkInsert('activity_types', data)
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('activity_types', null, {});
    }
};
