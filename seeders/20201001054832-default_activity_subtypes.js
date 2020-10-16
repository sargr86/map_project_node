'use strict';

const fse = require('fs-extra');
const path = require('path');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const data = await fse.readJSON(path.resolve(__dirname + '/data/activity_types.json'));
        console.log(data)
        const list = data.map(async (type) => {
            console.log(type.name)
            const type_id = await queryInterface.rawSelect('activity_types', {
                where: {
                    name: type.name
                },
            }, ['id']);


            return type.hasOwnProperty('subtypes') ? type.subtypes.map(t => {
                t.type_id = type_id;
                t.created_at = new Date.now();
                console.log(t)
                return t;
            }) : null;
        });

        const results = await Promise.all(list);

        return queryInterface.bulkInsert('activity_subtypes', [].concat.apply([], results.filter(t => t)))
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('activity_subtypes', null, {});
    }
};
