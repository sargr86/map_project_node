'use strict';
const fse = require('fs-extra');
const path = require('path');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = await fse.readJSON(path.resolve(__dirname + '/data/ferry_directions.json'));

        data['locations'].map(d => {
            d['created_at'] = new Date();
            d['updated_at'] = new Date();
        });


        return queryInterface.bulkInsert('ferries_directions', data['locations'], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ferries_directions', null, {});
    }
};
